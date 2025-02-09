const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, MessageFlags} = require('discord.js');
const { createEmbedMessage } = require('../../utils.js');
const kickCommand = require('./kick');
const banCommand = require('./ban');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('member')
        .setDescription('Server command')
        .addSubcommand(kickCommand.data)
        .addSubcommand(banCommand.data)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers, PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild),

	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		switch (subcommand) {
            case 'kick':
                await kickCommand.execute(interaction);
                break;
            case 'ban':
                await banCommand.execute(interaction);
                break;
            default:
                await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Unknown subcommand')], flags: MessageFlags.Ephemeral });
                break;
        }
	},
};