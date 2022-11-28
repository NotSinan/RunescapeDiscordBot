const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointRetriever = require('./singleton/endpoints')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("travellingmerchant")
    .setDescription("Get the current Travelling Merchant's Shop stock"),

    async execute(interaction) {
        const data = await fetch(endpointRetriever.getTravellingMerchantUrl())
        .then((response) => response.json())

        travellingMerchantEmbed = new EmbedBuilder()
        .setTitle('Travelling Merchant')
        .setDescription('The travelling merchant is selling...')
        .setColor('FFFFFF')
        .addFields({name: 'Items:', value: `${data.join('\n')}`})
        .setTimestamp()
        .setFooter({ text: 'Developed by Sinan', iconURL: 'https://pbs.twimg.com/tweet_video_thumb/ESoJdM8XQAAKwJ8.jpg:large' });

        await interaction.reply({embeds: [travellingMerchantEmbed]})
    }
}