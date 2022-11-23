const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("travellingmerchant")
    .setDescription("Get the current Travelling Merchant's Shop stock"),

    async execute(interaction) {
        const data = await fetch("https://api.weirdgloop.org/runescape/tms/current?lang=en")
        .then((response) => response.json())
        await interaction.reply(data.join("\n"))
    }
}