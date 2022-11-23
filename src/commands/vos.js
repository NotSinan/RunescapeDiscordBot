const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("vos")
    .setDescription("Retrieves the voice of seren that is currently activated."),

    async execute(interaction) {
        currentVos = await fetch("https://api.weirdgloop.org/runescape/vos")
        .then((response) => response.json())
        await interaction.reply(`The current Voice of Seren is in ${currentVos.district1} and ${currentVos.district2}`)
    }
}