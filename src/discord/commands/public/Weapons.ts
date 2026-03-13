import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { getWeaponsData } from "#functions";

export enum WeaponsCommands {
    Weapons = "weapons",
}

interface WeaponsInfo {
  displayName: string;
  displayIcon: string;
  shopData?: { 
    cost: number;
    category: string;
  };
  weaponStats?: { 
    fireRate: number;
    magazineSize: number;
    reloadTimeSeconds: number;
    equipTimeSeconds: number;
  };
    skins?: Array<{
        displayName: string;
        displayIcon: string;
    }>;
}


createCommand({
    name: WeaponsCommands.Weapons,
    description: "Mostra as armas e suas skins disponíveis no Valorant",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nome_arma",
            description: "Nome da arma que você deseja consultar",
            type: ApplicationCommandOptionType.String,
            required: true 
        },
        {
            name: "nome_skin",
            description: "Nome da skin (opcional) para retornar detalhes",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async run(interaction) {
        const { options } = interaction;
        await interaction.deferReply();
        const weaponName = options.getString("nome_arma", true).toLocaleLowerCase();
        const skinName = options.getString("nome_skin")?.toLocaleLowerCase();

        try {
            const weaponsData = await getWeaponsData() as WeaponsInfo[];
            const weapon = weaponsData.find(w => w.displayName.toLocaleLowerCase() === weaponName);

            if (!weapon) {
               return await interaction.editReply({
                    embeds: [{
                        color: 0xFD4556,
                        description: `❌ Arma **${weaponName}** não encontrada. Verifique a ortografia e tente novamente.`
                    }]
               })
            }

           if (skinName) {
                const skin = weapon.skins?.find(s => s.displayName.toLowerCase().includes(skinName));

                if (!skin) {
                    await interaction.editReply(`Skin **${skinName}** não encontrada para a arma **${weapon.displayName}**. Por favor, verifique o nome da skin e tente novamente.`);
                    return;
                }
                
                return await interaction.editReply({
                    embeds: [
                        {
                            title: `✨ ${skin.displayName}`,
                            description: `Skin para a arma **${weapon.displayName}**`,
                            image: { url: skin.displayIcon || weapon.displayIcon },
                            color: 0xFD4556, 
                            footer: { text: "Valorant Armory" }
                        }
                    ],
                })
           }

            const weaponEmbed = {
                title: `${weapon.displayName}`,
                description: `${weapon.shopData?.category}`,
                image: { url: weapon.displayIcon }, 
                fields: [
                    { name: "🏷️ Categoria", value: `\`${weapon.shopData?.category || "Corpo a Corpo"}\``, inline: true },
                    { name: "💰 Custo", value: `\`${weapon.shopData?.cost ? weapon.shopData.cost + ' Creds' : 'Grátis'}\``, inline: true },
                    { name: "\u200B", value: "\u200B", inline: true }, 
                    { name: "🔥 Cadência", value: weapon.weaponStats?.fireRate ? `${weapon.weaponStats.fireRate} tiros/s` : "N/A", inline: true },
                    { name: "🫙 Pente", value: weapon.weaponStats?.magazineSize ? `${weapon.weaponStats.magazineSize} balas` : "N/A", inline: true },
                    { name: "\u200B", value: "\u200B", inline: true }, 

                    { name: "🔄 Recarga", value: weapon.weaponStats?.reloadTimeSeconds ? `${weapon.weaponStats.reloadTimeSeconds}s` : "N/A", inline: true },
                    { name: "⚡ Equipar", value: weapon.weaponStats?.equipTimeSeconds ? `${weapon.weaponStats.equipTimeSeconds}s` : "N/A", inline: true },
                    { name: "\u200B", value: "\u200B", inline: true },
                ],
                color: 0xFD4556, 
            }

            return await interaction.editReply({
                embeds: [weaponEmbed],
            });

        } catch (error) {
            console.error("Erro ao buscar dados das armas:", error);
            await interaction.editReply("Ocorreu um erro ao buscar os dados das armas. Por favor, tente novamente mais tarde.");
        }
    }
});
