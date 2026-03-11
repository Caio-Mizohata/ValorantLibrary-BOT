import { createCommand } from "#base";
import { ApplicationCommandType } from "discord.js";
import { AgentCardCommands } from "./AgentCard";
import { AgentSkillsCommands } from "./AgentStatistics";
import { BuddiesCommands } from "./Buddies";
import { WeaponsCommands } from "./Weapons";

createCommand({
    name: "help",
    description: "Exibe a lista de comandos disponíveis do bot",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        await interaction.deferReply();
            const commandsList = [
                {
                    name: AgentCardCommands.Agent,
                    description: "Mostra um agente específico do Valorant",
                    usage: "/Agent nome_agente"
                },
                {
                    name: AgentSkillsCommands.AgentSkills,
                    description: "Mostra as habilidades de um agente específico do Valorant",
                    usage: "/agentSkills nome_agente"
                },
                {
                    name: BuddiesCommands.Buddies,
                    description: "Mostra os buddies disponíveis no Valorant",
                    usage: "/buddies nome_buddy"
                },
                {
                    name: WeaponsCommands.Weapons,
                    description: "Mostra as armas disponíveis no Valorant",
                    usage: "/weapons nome_arma"
                }
            ];

            const commandFields = commandsList.map(cmd => ({
                name: `/${cmd.name}`,
                value: `> ${cmd.description}\n**Uso:** \`${cmd.usage}\`\n\u200b`, 
                inline: false,
            }));
            return await interaction.editReply({
                embeds: [
                    {
                        thumbnail: { url: interaction.client.user?.displayAvatarURL() },
                        title: "Lista de Comandos",
                        fields: commandFields,
                        color: 0xFD4556,
                    }
                ],
            });
    },
})
