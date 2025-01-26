const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { createEmbedMessage } = require('../../utils.js');
const embedCommand = require('./embed.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('misc')
        .setDescription('Misc command')
        .addSubcommand(embedCommand.data),

	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		switch (subcommand) {
            case 'embed':
                await embedCommand.execute(interaction);
                break;
            default:
                await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Unknown subcommand')], flags: MessageFlags.Ephemeral });
                break;
        }
	},
};