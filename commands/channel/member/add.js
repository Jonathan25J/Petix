const { SlashCommandSubcommandBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const { createEmbedMessage } = require('../../../utils.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('add')
        .setDescription('Add a member to the channel')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The member you want to add to the channel')
                .setRequired(true)),

    async execute(interaction) {

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'I don\'t have the `ManageChannels` permission')], flags: MessageFlags.Ephemeral });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'I don\'t have the `ManageRoles` permission')], flags: MessageFlags.Ephemeral });
        }

        const user = interaction.options.getUser('user');
        const channel = interaction.channel

        if (!(channel.viewable || channel.manageable)) return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, `The bot doesn\'t have the right permissions for this channel`)], flags: MessageFlags.Ephemeral });

        if (channel.members.find((u) => u.id == user.id)) return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, `${user.toString()} is already in ${channel.toString()}`)], flags: MessageFlags.Ephemeral });

        try {
            await channel.permissionOverwrites.edit(user.id, { ViewChannel: true, SendMessages: true, CreateInstantInvite: false });
            await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, `${user.toString()} has been added to ${channel.toString()}`)] });
        } catch (error) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Failed to edit role permissions. Please check the role hierarchy')], flags: MessageFlags.Ephemeral });
        }


    },
};