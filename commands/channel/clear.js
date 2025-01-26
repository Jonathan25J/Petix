const { SlashCommandSubcommandBuilder, PermissionsBitField, MessageFlags, ChannelType } = require('discord.js');
const { createEmbedMessage } = require('../../utils.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('clear')
        .setDescription('Clear messages in the current channel')
        .addIntegerOption(option =>
            option.setName('messages-amount')
                .setDescription('The amount of messages you want to be removed')
                .setRequired(true)),

    async execute(interaction) {

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'I don\'t have the `ManageMessages` permission')], flags: MessageFlags.Ephemeral });
        }

        const amount = interaction.options.getInteger('messages-amount')

        if (amount <= 0) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'You need to remove at least one message')], flags: MessageFlags.Ephemeral });
        }

        if (interaction.channel.type !== ChannelType.GuildText) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'This command can only be used in text channels')], flags: MessageFlags.Ephemeral });
        }

        interaction.channel.bulkDelete(amount).then(async () =>
            await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, `You deleted ${amount} message(s)`)], flags: MessageFlags.Ephemeral })
        ).catch(async () =>
            await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'The bot can\'t delete the messages, Please check the role hierarchy')], flags: MessageFlags.Ephemeral })
        )

    },
};