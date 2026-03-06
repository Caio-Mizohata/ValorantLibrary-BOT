import { createCommand } from "#base";
import { getApiData } from "#functions";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

export enum AgentSkillsCommands {
    AgentSkills = "agentSkills",
}

interface AgentStatistics {
    displayName: string;
    displayIcon: string;
    role: {
        displayName: string,
        displayIcon: string,
    },
    abilities: [
        {
            slot: string,
            displayName: string,
            description: string,
            displayIcon: string,
        }
    ],
}

createCommand({
    name: AgentSkillsCommands.AgentSkills,
    description: "Mostra as habilidades de um agente específico do Valorant",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nome_agente",
            description: "Digite o nome do agente que deseja obter informações",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async run(interaction) {
        const { options } = interaction;
        const agentName = options.getString("nome_agente", true).toLocaleLowerCase();
        await interaction.deferReply();

        try {
            const agents = await getApiData() as AgentStatistics[];
            const agent = agents.find(a => a.displayName.toLocaleLowerCase() === agentName);

            if (!agent) {
                await interaction.editReply(`Agente "${agentName}" não encontrado. Por favor, verifique o nome e tente novamente.`);
                return;
            }
            
            const abilitiesFields = agent.abilities.map(ability => {
              
                const slotKeys: Record<string, string> = {
                    'Ability1': '` Q `',
                    'Ability2': '` E `',
                    'Grenade': '` C `',
                    'Ultimate': '` X `',
                    'Passive': '` Passiva `'
                };
                
                const key = slotKeys[ability.slot as keyof typeof slotKeys] ? ` ${slotKeys[ability.slot as keyof typeof slotKeys]}` : '';

                return {
                    name: `🔹 ${ability.displayName}${key}`, 
                    value: `> ${ability.description}\n\u200b`, 
                    inline: false 
                };
            });

            await interaction.editReply({
                embeds: [
                    {
                        title: `${agent.displayName} Skills`,
                        description: `**Function:** ${agent.role.displayName}\n\u200b`,
                        thumbnail: { url: agent.displayIcon },
                        color: 0xFD4556,
                        fields: abilitiesFields, 
                    }
                ]
            });
        } catch (error) {
            console.error("Error fetching agent information:", error);
            await interaction.editReply("Ocorreu um erro ao buscar informações do agente. Por favor, tente novamente.");
        }
    },   
})
   