const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointRetriever = require('./singleton/endpoints')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vos')
    .setDescription('Display the current Voice of Seren.'),

    async execute(interaction) {
        currentVos = await fetch(endpointRetriever.getVosUrl())
        .then((response) => response.json())
        await interaction.reply(`The current Voice of Seren is in ${currentVos.district1} and ${currentVos.district2}`)
    }
}