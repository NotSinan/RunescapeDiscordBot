const { SlashCommandBuilder, channelLink } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



module.exports = {
    data: new SlashCommandBuilder()
    .setName('search')
    .setDescription("Search Runescape Players")
    .addStringOption(option => 
        option.setName("username")
        .setDescription("The username to search.")
        .setRequired(true)),

    
    async execute(interaction) {
        const username = interaction.options.getString('username');

        const data = await fetch(`https://apps.runescape.com/runemetrics/profile/profile?user=${username}&activities=0`)
        .then((response) => response.json())
        .catch((error) => console.log(error))
        console.log(data)

        
        if (data.error === 'PROFILE_PRIVATE') {
            await interaction.reply("This profile has been privated.")
        } else {
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0011FF)
        .setTitle(`${data.name}`)
        .setURL('https://discord.js.org/')
        .setThumbnail(`https://secure.runescape.com/m=avatar-rs/${data.name.replace(" ", "%2")}/chat.png`)
        .addFields(
            { name: 'Combat Level', value: `${data.combatlevel}`, inline: true },
            { name: 'Total Skill', value: `${data.totalskill}`, inline: true },
            { name: 'Rank', value: `${data.rank}`, inline: true },
        )
        .addFields(
            { name: 'Total Exp', value: `${new Intl.NumberFormat().format(data.totalxp)}`, inline: true },
            { name: 'Quests Complete', value: `${data.questscomplete}`, inline: true},
            { name: 'Logged In', value: `${data.loggedIn}`, inline: true}
        )
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Developed by Sinan', iconURL: 'https://pbs.twimg.com/tweet_video_thumb/ESoJdM8XQAAKwJ8.jpg:large' });

        await interaction.reply({embeds: [exampleEmbed]})
        }
    },
};