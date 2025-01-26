const { SlashCommandBuilder, InteractionContextType, MessageFlags } = require('discord.js');
const { createEmbedMessage } = require('../../utils.js');
const infoCommand = require('./info');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
        .setDescription('Server command')
        .addSubcommand(infoCommand.data)
        .setContexts(InteractionContextType.Guild),

	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		switch (subcommand) {
            case 'info':
                await infoCommand.execute(interaction);
                break;
            default:
                await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Unknown subcommand')], flags: MessageFlags.Ephemeral });
                break;
        }
	},
};