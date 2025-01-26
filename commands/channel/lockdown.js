const { SlashCommandSubcommandBuilder, PermissionsBitField, MessageFlags, ChannelType } = require('discord.js');
const { createEmbedMessage } = require('../../utils.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('lockdown')
        .setDescription('Set a channel in lockdown or undo the lockdown'),

    async execute(interaction) {

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'I don\'t have the `ManageChannels` permission')], flags: MessageFlags.Ephemeral });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'I don\'t have the `ManageRoles` permission')], flags: MessageFlags.Ephemeral });
        }

        const channel = interaction.channel

        if (channel.type !== ChannelType.GuildText) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'This command can only be used in text channels')], flags: MessageFlags.Ephemeral });
        }

        const everyoneRole = channel.guild.roles.everyone;
        const defaultChannelPermissions = channel.permissionsFor(everyoneRole).toArray()
        const isLockdown = !defaultChannelPermissions.includes('SendMessages')

        try {
            if (isLockdown) {
                await channel.permissionOverwrites.edit(everyoneRole, { SendMessages: true });
                await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, `Removed channel ${channel.toString()} from lockdown`)] });
            } else {
                await channel.permissionOverwrites.edit(everyoneRole, { SendMessages: false });
                await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, `Channel ${channel.toString()} is now in lockdown`)] });
            }
        } catch (error) {
            await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Failed to edit role permissions. Please check the role hierarchy')], flags: MessageFlags.Ephemeral });
        }
    },
};