const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointRetriever = require('./singleton/endpoints')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('accountscreated')
    .setDescription('Displays total number of RuneScape accounts created.'),

    async execute(interaction) {
        const data = await fetch(endpointRetriever.getAccountCreatedUrl())
        .then((response) => response.json())
        await interaction.reply(`${data.accountsformatted} RuneScape accounts have been created.`)
    }
}