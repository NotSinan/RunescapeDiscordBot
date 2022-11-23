const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')),
    
    async execute(interaction) {
        const echo = interaction.options.getString('input');
        await interaction.reply(echo)
    }
}