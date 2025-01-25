const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const kickCommand = require('./kick');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('member')
        .setDescription('Server command')
        .addSubcommand(kickCommand.data),

	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		switch (subcommand) {
            case 'kick':
                await kickCommand.execute(interaction);
                break;
            default:
                await interaction.reply({ content: 'Unknown subcommand', flags: MessageFlags.Ephemeral });
                break;
        }
	},
};