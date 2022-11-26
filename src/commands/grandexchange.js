const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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
        console.log(itemId)

        const itemData = await fetch(`https://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=${itemId}`)
        .then((response) => response.json())

        console.log(`${itemData.item.name}`)
        

        const itemEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${itemData.item.name}`)
        .setURL(`https://secure.runescape.com/m=itemdb_rs/viewitem?obj=${itemData.item.id}`)
        .setDescription(`${itemData.item.description}`)
        .setThumbnail(`${itemData.item.icon_large}`)
        .addFields(
            { name: 'Type', value: `${itemData.item.type}`, inline: true },
            { name: 'Current', value: `${itemData.item.current.trend} ${itemData.item.current.price}`, inline: true },
            { name: 'Today', value: `${itemData.item.today.trend} ${itemData.item.today.price}`, inline: true }
        )
        .addFields(
            { name: 'Day 30', value: `${itemData.item.day30.trend} ${itemData.item.day30.change}`, inline: true },
            { name: 'Day 90', value: `${itemData.item.day90.trend} ${itemData.item.day90.change}`, inline: true },
            { name: 'Day 180', value: `${itemData.item.day180.trend} ${itemData.item.day180.change}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Developed by Sinan', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        
        await interaction.reply({
            embeds: [itemEmbed]
        }) 
    }
}