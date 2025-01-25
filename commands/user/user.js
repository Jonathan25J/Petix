const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const avatarCommand = require('./avatar.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
        .setDescription('User command')
        .addSubcommand(avatarCommand.data),

	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		switch (subcommand) {
            case 'avatar':
                await avatarCommand.execute(interaction);
                break;
            default:
                await interaction.reply({ content: 'Unknown subcommand', flags: MessageFlags.Ephemeral });
                break;
        }
	},
};