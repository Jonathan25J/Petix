const { SlashCommandSubcommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags, PermissionsBitField } = require('discord.js');
const { getUserFromMention, COLORS } = require('../../utils.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('kick')
        .setDescription('Kick a member')
        .addStringOption(option =>
            option.setName('member')
                .setDescription('Mention the name of the member you want to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for kicking the member')),

    async execute(interaction) {

        if (!interaction.guild) {
            return await interaction.reply({ content: 'This command can only be used in a server', flags: MessageFlags.Ephemeral });
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return await interaction.reply({ content: 'You do not have permission to use this command', flags: MessageFlags.Ephemeral });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return await interaction.reply({ content: 'I do not have permission to kick members', flags: MessageFlags.Ephemeral });
        }

        const givenMember = interaction.options.getString('member');
        const member = interaction.guild.members.cache.get(getUserFromMention(interaction, givenMember).id);
        const reason = interaction.options.getString('reason') || 'No reason given';

        if (!member) {
            return await interaction.reply({ content: 'Member not found', flags: MessageFlags.Ephemeral });
        }

        if (!member.kickable) {
            return await interaction.reply({ content: 'I cannot kick this member', flags: MessageFlags.Ephemeral });
        }

        const embedRequestKick = new EmbedBuilder()
            .setTitle('Kick Member')
            .setDescription(`Are you sure you want to kick ${member}?`)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .addFields({ name: 'Reason', value: reason })
            .setColor(COLORS.RED)
            .setTimestamp();

        const response = await interaction.reply({ embeds: [embedRequestKick], components: [getConfirmAndCancelButton()], flags: MessageFlags.Ephemeral, withResponse: true });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            const responseEmbed = new EmbedBuilder()
                .setTitle('Kick Member')
                .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                .setColor(COLORS.RED)
                .setTimestamp();

            // Kick the member if the user confirms the kick and change the embed accordingly
            if (confirmation.customId === 'confirm') {

                await member.kick({ reason: reason });

                responseEmbed.setDescription(`${member} has been kicked`);
            } else {
                responseEmbed.setDescription(`${member} has not been kicked`);
                responseEmbed.setColor(COLORS.GRAY);
            }
            await interaction.editReply({ embeds: [responseEmbed], components: [] });

        } catch {
            await interaction.editReply({ components: [] });
        }

    },
};

function getConfirmAndCancelButton() {
    const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('Confirm kick')
        .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary);

    return new ActionRowBuilder()
        .addComponents(cancel, confirm);
}