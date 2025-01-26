const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const infoCommand = require('./info.js');
const avatarCommand = require('./avatar.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
        .setDescription('User command')
        .addSubcommand(infoCommand.data)
        .addSubcommand(avatarCommand.data),

	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		switch (subcommand) {
            case 'info':
                await infoCommand.execute(interaction);
                break;
            case 'avatar':
                await avatarCommand.execute(interaction);
                break;
            default:
                await interaction.reply({ content: 'Unknown subcommand', flags: MessageFlags.Ephemeral });
                break;
        }
	},
};