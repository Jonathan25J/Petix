const { SlashCommandSubcommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags, PermissionsBitField } = require('discord.js');
const { COLORS, createEmbedMessage } = require('../../utils.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption(option =>
            option.setName('member')
                .setDescription('The member you want to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning the member')),

    async execute(interaction) {

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'I don\'t have the `BanMembers` permission')], flags: MessageFlags.Ephemeral });
        }

        const givenMember = interaction.options.getUser('member');
        let member = null;

        if (givenMember) {
            member = interaction.guild.members.cache.get(givenMember.id);
        }

        const reason = interaction.options.getString('reason') || 'No reason given';

        if (!member) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'Member not found')], flags: MessageFlags.Ephemeral });
        }

        if (!member.bannable) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'I cannot ban this member')], flags: MessageFlags.Ephemeral });
        }

        const embedRequestBan = new EmbedBuilder()
            .setTitle('Ban Member')
            .setDescription(`Are you sure you want to ban ${member}?`)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .addFields({ name: 'Reason', value: reason })
            .setColor(COLORS.RED)
            .setTimestamp();

        const response = await interaction.reply({ embeds: [embedRequestBan], components: [getConfirmAndCancelButton()], flags: MessageFlags.Ephemeral, withResponse: true });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            let responseEmbed = new EmbedBuilder()
                .setTitle('Ban Member')
                .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                .setColor(COLORS.RED)
                .setTimestamp();

            // Ban the member if the user confirms the ban and change the embed accordingly
            if (confirmation.customId === 'confirm') {

                await member.ban({ reason: reason });

                responseEmbed.setDescription(`${member} has been banned`);
            } else {
                responseEmbed.setDescription(`${member} has not been banned`);
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
        .setLabel('Confirm ban')
        .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary);

    return new ActionRowBuilder()
        .addComponents(cancel, confirm);
}

