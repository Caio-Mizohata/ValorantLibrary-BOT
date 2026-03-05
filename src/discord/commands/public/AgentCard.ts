import { createCommand } from "#base";
import axios from "axios";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

const ApiValorant = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

interface AgentCard {
    displayName: string;
    description: string;
    fullPortrait: string;
    role: {
        displayName: string,
        displayIcon: string,
    },
}

createCommand({
    name: "agentCard",
    description: "Mostra um agente específico do Valorant",
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
        const agentName = options.getString("nome_agente", true);
        await interaction.deferReply();

        try {
            const response = await axios.get(ApiValorant);
            const agents: AgentCard[] = response.data.data;

            const agent = agents.find(a => a.displayName.toLocaleLowerCase() === agentName.toLocaleLowerCase());

            if (!agent) {
                await interaction.editReply(`Agente "${agentName}" não encontrado. Por favor, verifique o nome e tente novamente.`);
                return;
            }

            return await interaction.editReply({
                embeds: [
                    {
                        title: `${agent.displayName}`,
                        description: `### Function: ${agent.role.displayName}\n\n${agent.description}`,
                        image: { url: agent.fullPortrait },
                        thumbnail: { url: agent.role.displayIcon },
                        color: 0xFD4556,
                    }
                ],
            });

        } catch (error) {
            console.error("Error fetching agent information:", error);
            await interaction.editReply("Ocorreu um erro ao buscar informações do agente. Por favor, tente novamente.");
        }
    }
});
