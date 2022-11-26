const { AttachmentBuilder, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var plotly = require('plotly')("labofsinan", "mepFGawdlV2LcrAcPl2F")
var fs = require('fs');



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

        const p = new Promise((resolve, reject) => {
            const keyArray = []; 
            const valueArray = [];
            for (const [key, value] of Object.entries(graphData.daily)) { 
                keyArray.push(`${key}`);
                valueArray.push(`${value}`);
            }

            var trace = {
              type: 'scatter',
              x: keyArray,
              y: valueArray,
            };
        
            var layout = {
              plot_bgcolor: 'rgb(52, 54, 60)',
              paper_bgcolor: 'rgb(52, 54, 60)',
            };
        
            var chart = { data: [trace], layout: layout };
        
            var pngOptions = { format: 'png', width: 1000, height: 500 };
        
            plotly.getImage(chart, pngOptions, (err, imageStream) => {
              if ( err ) return reject(err);
              var fileStream = fs.createWriteStream('test.png');
              imageStream.pipe(fileStream);
              fileStream.on('error', reject);
              fileStream.on('finish', resolve);
            });
        });

        await p.then((res) => console.log("Success")).catch((error) => console.log("Error"))

        const file = new AttachmentBuilder('./test.png');

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
        .setImage('attachment://test.png')
        .setTimestamp()
        .setFooter({ text: 'Developed by Sinan', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        await interaction.reply({
            embeds: [itemEmbed],
            files: [file]
        }) 
    }
}