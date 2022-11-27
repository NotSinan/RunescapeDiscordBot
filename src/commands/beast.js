const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('beast')
    .setDescription('Runescape Beast Information')
    .addIntegerOption(option => option.setName('id')
    .setDescription('Id of beast')
    .setRequired(true)),

    async execute(interaction) {
        const id = interaction.options.getInteger('id');

        const beastData = fetch(`https://secure.runescape.com/m=itemdb_rs/bestiary/beastData.json?beastid=${id}`)
        .then((response) => response.json())

        const beastEmbed = new EmbedBuilder()
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

    }
}