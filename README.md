# RuneScape Discord Bot

This Discord bot uses the RuneScape API and discord.js to provide RuneScape-related information to users in Discord servers.

# Installation

To use this Discord bot, you will need to have Node.js and npm installed on your system.

1. Clone this repository to your local machine.

```
$ git clone https://github.com/NotSinan/RunescapeDiscordBot.git
```

2. To install the necessary packages, run the following command:

```
$ npm install
```

# Configuration

To use this bot, you will need to create a `config.json` file in the root directory of the project. This file should contain the following information:

```json
{
  "token": "your_bot_token",
  "clientId": "your_client_id",
  "guildId": "your_guild_id"
}
```

- Replace `your_bot_token`, `your_client_id`, and `your_guild_id` with the appropriate values for your bot.
- You can obtain your bot token by creating a bot through the <a href="https://discord.com/developers/docs/intro" target="_blank">Discord developer portal<a>.
- Your client ID and guild ID can be obtained by enabling developer mode in Discord and right clicking on your bot in the server list and selecting "Copy ID".

# Deploying commands

This bot uses the discord-command-loader package to manage commands. To deploy commands to your server, you can use the deploy-commands.js script.

```
$ npm run deploycmds
```

# Running the bot

To run the bot, use the following command:

```
$ npm run start
```

# Available commands

The following commands are available:

- `/accountscreated`: Shows the number of RuneScape accounts that have been created.
- `/beast [id]`: Shows information about the specified beast.
- `/grandexchange [itemId]`: Shows information about the specified item on the Grand Exchange.
- `/search [username]`: Shows information about the specified RuneScape player.
- `/travellingmerchant`: Shows the current stock of the Travelling Merchant.
- `/vos`: Shows the current Voice of Seren status for the active clans in Gielinor.

# Contributing

If you would like to contribute to this project, please feel free to open a pull request.
