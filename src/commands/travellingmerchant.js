const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const endpointRetriever = require('./singleton/endpoints')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('travellingmerchant')
        .setDescription("Get the current Travelling Merchant's Shop stock"),

    async execute(interaction) {
        await interaction.deferReply()
        await fetch(endpointRetriever.getTravellingMerchantUrl())
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to get the data')
                }
                return response.json()
            })
            .then(async (data) => {
                travellingMerchantEmbed = new EmbedBuilder()
                    .setTitle('Travelling Merchant')
                    .setDescription('The travelling merchant is selling...')
                    .setColor('FFFFFF')
                    .addFields({ name: 'Items:', value: `${data.join('\n')}` })
                    .setTimestamp()
                    .setFooter({
                        text: 'Developed by Sinan',
                        iconURL: endpointRetriever.getRunescapeLogoUrl(),
                    })

                await interaction.editReply({
                    embeds: [travellingMerchantEmbed],
                })
            })
            .catch((e) => interaction.editReply(e))
    },
}
