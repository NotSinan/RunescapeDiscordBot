const { AttachmentBuilder, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const QuickChart = require('quickchart-js');
const endpointRetriever = require('./singleton/endpoints')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('grandexchange')
    .setDescription('Displays item information.')
    .addIntegerOption(option => 
        option.setName('id')
        .setDescription('Item identification number')
        .setRequired(true)
    ),

    async execute(interaction) {
        const itemData = await fetch(endpointRetriever.getGrandExchangeUrl(interaction.options.getInteger('id')))
        .then((response) => response.json())

        await interaction.deferReply()

        const graphData = await fetch(endpointRetriever.getGraphUrl(interaction.options.getInteger('id')))
        .then((response) => response.json())

        const keys = Object.keys(graphData.daily)
        const values = Object.values(graphData.daily)

        const chart = new QuickChart();
        chart.setConfig({
        type: 'line',
        data: { labels: keys, datasets: [{ label:'Price', data: values }] },
        });

        const chartUrl = await chart.getShortUrl();

        const itemEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${itemData.item.name}`)
        .setURL(endpointRetriever.getItemImageUrl(interaction.options.getInteger('id')))
        .setDescription(`${itemData.item.description}`)
        .setThumbnail(`${itemData.item.icon_large}`)
        .addFields(
            { name: 'Type', value: `${itemData.item.type}`, inline: true },
            { name: 'Current Price', value: `${itemData.item.current.price} GP`, inline: true },
            { name: 'Today', value: `${itemData.item.today.trend} ${itemData.item.today.price}`, inline: true }
        )
        .addFields(
            { name: 'Day 30', value: `${itemData.item.day30.trend} ${itemData.item.day30.change}`, inline: true },
            { name: 'Day 90', value: `${itemData.item.day90.trend} ${itemData.item.day90.change}`, inline: true },
            { name: 'Day 180', value: `${itemData.item.day180.trend} ${itemData.item.day180.change}`, inline: true }
        )
        .setImage(chartUrl)
        .setTimestamp()
        .setFooter({ text: 'Developed by Sinan', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        await interaction.editReply({
            embeds: [itemEmbed]
        })
    }
}