import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { getBuddiesData } from "#functions";

export enum BuddiesCommands {
    Buddies = "buddies",
}

interface Buddies {
    displayName: string;
    displayIcon: string;
    levels: [
        {
            displayName: string;
            charmLevel: number;
            displayIcon: string;
        }
    ]
}

createCommand({
    name: BuddiesCommands.Buddies,
    description: "Mostra os buddies disponíveis no Valorant",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nome_buddy",
            description: "Digite o nome do buddy que deseja obter informações",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async run(interaction) {
        const { options } = interaction;
        await interaction.deferReply();
        const buddyName = options.getString("nome_buddy", true).toLocaleLowerCase();

        try {
            const buddiesData = await getBuddiesData() as Buddies[];
            const buddy = buddiesData.find(b => b.displayName.toLocaleLowerCase() === buddyName);

            if (!buddy) {
                await interaction.editReply(`Buddy "${buddyName}" não encontrado. Por favor, verifique o nome e tente novamente.`);
                return;
            }

            return await interaction.editReply({
                embeds: [
                    {
                        title: buddy.displayName,
                        thumbnail: { url: buddy.displayIcon },
                        fields: buddy.levels.map(level => ({
                            name: level.displayName,
                            value: `Nível: ${level.charmLevel}`,
                            inline: true,
                        })),
                        color: 0xFD4556,
                    }
                ],
            });

        } catch (error) {
            console.error("Error fetching buddies data:", error);
            await interaction.editReply("Failed to fetch buddies data.");
        }
    }
});
