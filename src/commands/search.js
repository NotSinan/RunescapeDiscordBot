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

        const data = await fetch(`https://apps.runescape.com/runemetrics/profile/profile?user=${username}&activities=1`)
        .then((response) => response.json())
        .catch((error) => console.log(error))

        const clanNameData = await fetch(`https://secure.runescape.com/m=website-data/playerDetails.ws?names=%5B%22${username}%22%5D&callback=jQuery000000000000000_0000000000&_=0`)
        .then((response) => response.text)

        console.log(clanNameData)


        if (data.error === 'PROFILE_PRIVATE') {
            await interaction.reply("This profile is private.")
        } else {
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0011FF)
        .setTitle(`${data.name}`)
        .setThumbnail(`https://secure.runescape.com/m=avatar-rs/${data.name.replace(" ", "%2")}/chat.png`)
        .addFields(
            { name: 'COMBAT LEVEL', value: `${data.combatlevel}`, inline: true },
            { name: 'TOTAL SKILL', value: `${data.totalskill}`, inline: true },
            { name: 'RANK', value: `${data.rank}`, inline: true },
        )
        .addFields(
            { name: 'TOTAL EXPERIENCE', value: `${new Intl.NumberFormat().format(data.totalxp)}`, inline: true },
            { name: 'QUESTS COMPLETE', value: `${data.questscomplete}`, inline: true},
            { name: 'LOGGED IN', value: `${data.loggedIn}`, inline: true}
        )
        .setTimestamp()
        .setFooter({ text: 'Developed by Sinan', iconURL: 'https://pbs.twimg.com/tweet_video_thumb/ESoJdM8XQAAKwJ8.jpg:large' });

        await interaction.reply({embeds: [exampleEmbed]})

        }
    },
};