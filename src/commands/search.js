const { SlashCommandBuilder, channelLink } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointRetriever = require('./singleton/endpoints')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Displays player information.')
    .addStringOption(option => 
        option.setName('username')
        .setDescription('The username to look up.')
        .setRequired(true)),

    async execute(interaction) {

        await interaction.deferReply()

        const data = await fetch(endpointRetriever.getSearchUrl(interaction.options.getString('username')))
        .then((response) => response.json())
        .catch((error) => console.log(error))

        if (data.error === 'PROFILE_PRIVATE') {
            await interaction.editReply('This profile is private.')
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

        await interaction.editReply({embeds: [exampleEmbed]})
        }
    }
}