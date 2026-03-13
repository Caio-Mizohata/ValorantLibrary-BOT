<div align="center">

# 🎮 ValorantLibrary BOT

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.12+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Discord.js](https://img.shields.io/badge/discord.js-14.25-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Valorant](https://img.shields.io/badge/Valorant-API-FD4556?style=for-the-badge&logo=valorant&logoColor=white)

Um Bot simples para Discord que fornece informações detalhadas sobre o universo de **Valorant** — agentes, habilidades, armas e buddies — diretamente no seu servidor.

</div>

---

## 📖 Sobre o Projeto

O **ValorantLibrary BOT** é um bot Discord desenvolvido em TypeScript que consome a API pública [valorant-api.com](https://valorant-api.com) para trazer dados atualizados do jogo Valorant. Com comandos slash intuitivos, os membros do seu servidor podem consultar fichas de agentes, habilidades detalhadas com teclas de ativação, estatísticas de armas e informações sobre buddies — tudo sem sair do Discord.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| [TypeScript](https://www.typescriptlang.org/) | Linguagem principal do projeto |
| [Node.js](https://nodejs.org/) | Runtime JavaScript |
| [discord.js](https://discord.js.org/) | Biblioteca para interação com a API do Discord |
| [Constatic](https://constatic-docs.vercel.app/pt) | Framework de estrutura para bots Discord |
| [Axios](https://axios-http.com/) | Cliente HTTP para consumo de APIs |
| [Zod](https://zod.dev/) | Validação de variáveis de ambiente |
| [DisCloud](https://discloud.com/) | Plataforma de hospedagem do bot |

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados/configurados:

- [Node.js](https://nodejs.org/) versão **20.12** ou superior
- [npm](https://www.npmjs.com/) (incluído com o Node.js)
- Uma aplicação criada no [Discord Developer Portal](https://discord.com/developers/applications) com o **Bot Token** gerado

---

## ⚙️ Instalação e Configuração

**1. Clone o repositório:**

```bash
git clone https://github.com/Caio-Mizohata/ValorantLibrary-BOT.git
cd ValorantLibrary-BOT
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
BOT_TOKEN=seu_token_do_bot_aqui
WEBHOOK_LOGS_URL=https://discord.com/api/webhooks/...  # Opcional
GUILD_ID=id_do_seu_servidor                             # Opcional
```

| Variável | Obrigatória | Descrição |
|---|---|---|
| `BOT_TOKEN` | ✅ Sim | Token do bot obtido no Discord Developer Portal |
| `WEBHOOK_LOGS_URL` | ❌ Não | URL de webhook para envio de logs |
| `GUILD_ID` | ❌ Não | ID do servidor para registrar comandos em modo de desenvolvimento |

---

## ▶️ Como Executar

### Desenvolvimento

```bash
# Execução única
npm run dev

# Execução com hot-reload (reinicia ao salvar)
npm run watch
```

### Produção

```bash
# 1. Compilar o projeto
npm run build

# 2. Iniciar o bot compilado
npm run start
```

### Todos os scripts disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `check` | `npm run check` | Verifica erros de tipagem sem compilar |
| `build` | `npm run build` | Compila o projeto TypeScript |
| `dev` | `npm run dev` | Executa o bot em modo de desenvolvimento |
| `dev:dev` | `npm run dev:dev` | Executa com arquivo `.env.dev` |
| `watch` | `npm run watch` | Executa com hot-reload |
| `watch:dev` | `npm run watch:dev` | Hot-reload com `.env.dev` |
| `start` | `npm run start` | Executa o bot compilado |
| `start:dev` | `npm run start:dev` | Executa compilado com `.env.dev` |

---

## 📁 Estrutura de Pastas

```
ValorantLibrary-BOT/
├── constants.json          # Paleta de cores utilizada nos embeds
├── discloud.config         # Configuração de deploy na DisCloud
├── package.json            # Dependências e scripts do projeto
├── tsconfig.json           # Configurações do TypeScript
├── .env                    # Variáveis de ambiente (não versionado)
└── src/
    ├── index.ts            # Ponto de entrada da aplicação
    ├── constants.ts        # Carrega constants.json no escopo global
    ├── env.ts              # Validação das variáveis de ambiente com Zod
    ├── discord/
    │   ├── index.ts        # Setup dos criadores (commands, events, responders)
    │   └── commands/
    │       └── public/
    │           ├── AgentCard.ts        # Comando /agent
    │           ├── AgentStatistics.ts  # Comando /agentSkills
    │           ├── Buddies.ts          # Comando /buddies
    │           ├── Help.ts             # Comando /help
    │           └── Weapons.ts          # Comando /weapons
    └── functions/
        └── ValorantAPI.ts  # Funções de consumo da API do Valorant
```

---

## 🤖 Comandos do Bot

| Comando | Parâmetro | Descrição |
|---|---|---|
| `/agent` | `nome_agente` (obrigatório) | Exibe o card de um agente com retrato, função e descrição |
| `/agentSkills` | `nome_agente` (obrigatório) | Exibe as habilidades do agente com as teclas de ativação (Q, E, C, X) |
| `/buddies` | `nome_buddy` (obrigatório) | Exibe informações de um buddy (ícone e níveis) |
| `/weapons` | `nome_arma` (obrigatório) | Exibe estatísticas da arma (custo, cadência, pente, recarga, tempo de equipar) |
| `/help` | — | Lista todos os comandos disponíveis do bot |

### Exemplos de uso

```
/agent nome_agente: Jett
/agentSkills nome_agente: Omen
/buddies nome_buddy: Araxys
/weapons nome_arma: Vandal
/help
```

---

## 🌐 API Utilizada

Este projeto consome a API pública e gratuita **[Valorant API](https://valorant-api.com)**, que fornece dados atualizados do jogo.

### Endpoints consumidos

| Endpoint | Descrição |
|---|---|
| `GET /v1/agents?isPlayableCharacter=true` | Retorna todos os agentes jogáveis com descrições, habilidades e imagens |
| `GET /v1/buddies` | Retorna todos os buddies disponíveis no jogo |
| `GET /v1/weapons` | Retorna todas as armas com estatísticas e dados de loja |

> A API não requer autenticação e é mantida pela comunidade.
