const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, MessageFlags } = require('discord.js');
const { createEmbedMessage } = require('../../utils.js');
const clearCommand = require('./clear');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Channel command')
        .addSubcommand(clearCommand.data)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setContexts(InteractionContextType.Guild),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'clear':
                await clearCommand.execute(interaction);
                break;
            default:
                await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Unknown subcommand')], flags: MessageFlags.Ephemeral });
                break;
        }
    },
};