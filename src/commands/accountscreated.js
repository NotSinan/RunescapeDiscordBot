const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const endpointRetriever = require('./singleton/endpoints')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accountscreated')
        .setDescription('Displays total number of RuneScape accounts created.'),

    async execute(interaction) {
        await interaction.deferReply()

        await fetch(endpointRetriever.getAccountCreatedUrl())
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to get data.')
                }
                return response.json()
            })
            .then(async (data) => {
                const accountsCreatedEmbed = new EmbedBuilder()
                    .setTitle('RuneScape Accounts Created')
                    .setDescription('The total RuneScape accounts created is: ')
                    .setColor('FFFFFF')
                    .setImage(endpointRetriever.getAccountCreatedUrl())
                    .addFields({
                        name: 'Accounts',
                        value: `${data.accountsformatted}`,
                    })
                    .setTimestamp()
                    .setFooter({
                        text: 'Developed by Sinan',
                        iconURL: endpointRetriever.getRunescapeLogoUrl(),
                    })

                await interaction.editReply({ embeds: [accountsCreatedEmbed] })
            })
            .catch(async (e) => await interaction.editReply(`${e.message}`))
    },
}
