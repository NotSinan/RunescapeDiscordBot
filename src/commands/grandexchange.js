const { AttachmentBuilder, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var fs = require('fs');
const QuickChart = require('quickchart-js');



module.exports = {
    data: new SlashCommandBuilder()
    .setName("grandexchange")
    .setDescription("Item look up for Grand Exchange")
    .addIntegerOption(option => 
        option.setName("item")
        .setDescription("Item ID to look up.")
        .setRequired(true)
    ),

    async execute(interaction) {
        const itemId = interaction.options.getInteger('item')

        const itemData = await fetch(`https://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=${itemId}`)
        .then((response) => response.json())

        const graphData = await fetch(`https://secure.runescape.com/m=itemdb_rs/api/graph/${itemId}.json`)
        .then((response) => response.json())
        const keyArray = []; 
        const valueArray = [];

        await interaction.deferReply({ephemeral: true});

        for await (const [key, value] of Object.entries(graphData.daily)) { 
            keyArray.push(`${key}`);
            valueArray.push(`${value}`);
        }

        const chart = new QuickChart();
        chart.setConfig({
        type: 'line',
        data: { labels: keyArray, datasets: [{ label:'Price', data: valueArray }] },
        });

        const chartUrl = await chart.getShortUrl();

        const itemEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${itemData.item.name}`)
        .setURL(`https://secure.runescape.com/m=itemdb_rs/viewitem?obj=${itemData.item.id}`)
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