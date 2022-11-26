const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("accountscreated")
    .setDescription("Displays the number accounts created for Runescape"),

    async execute(interaction) {
        const data = await fetch("https://secure.runescape.com/m=account-creation-reports/rsusertotal.ws")
        .then((response) => response.json())
        await interaction.reply(`The number of accounts created for Runescape is ${data.accountsformatted}`)
    }
}