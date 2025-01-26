const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, MessageFlags } = require('discord.js');
const { createEmbedMessage } = require('../../utils.js');
const clearCommand = require('./clear');
const lockdownCommand = require('./lockdown.js');
const addMemberCommand = require('./member/add.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Channel command')
        .addSubcommand(clearCommand.data)
        .addSubcommand(lockdownCommand.data)
        .addSubcommandGroup(group =>
            group.setName('member')
                .setDescription('Channel member related commands')
                .addSubcommand(addMemberCommand.data))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageRoles, PermissionFlagsBits.ManageMessages)
        .setContexts(InteractionContextType.Guild),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'clear':
                return await clearCommand.execute(interaction);
            case 'lockdown':
                return await lockdownCommand.execute(interaction);
            default:
                break;
        }

        const subcommandGroup = interaction.options.getSubcommandGroup();

        switch (subcommandGroup) {
            case 'member':
                switch (subcommand) {
                    case 'add':
                        return await addMemberCommand.execute(interaction);
                    default:
                        return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Unknown subcommand')], flags: MessageFlags.Ephemeral });
                }
            default:
                break;
        }

        await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Unknown subcommand or subcommand group')], flags: MessageFlags.Ephemeral });
    },
};