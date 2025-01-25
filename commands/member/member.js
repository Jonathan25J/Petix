const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, MessageFlags} = require('discord.js');
const kickCommand = require('./kick');
const banCommand = require('./ban');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('member')
        .setDescription('Server command')
        .addSubcommand(kickCommand.data)
        .addSubcommand(banCommand.data)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
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
                await interaction.reply({ content: 'Unknown subcommand', flags: MessageFlags.Ephemeral });
                break;
        }
	},
};