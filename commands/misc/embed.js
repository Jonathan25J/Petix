const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { COLORS, createEmbedMessage } = require('../../utils.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('embed')
        .setDescription('Create a custom embed')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title of the embed'))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message of the embed'))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The hex color of the embed')),

    async execute(interaction) {
        const title = interaction.options.getString('title')
        const message = interaction.options.getString('message')
        const color = interaction.options.getString('color')

        if (color && !isHexColor(color)) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'The given color is not in hex format')], flags: MessageFlags.Ephemeral });
        }

        if (!title && !message) {
            return await interaction.reply({ embeds: [createEmbedMessage(interaction.guild, 'You need to give at least a title or a message')], flags: MessageFlags.Ephemeral });
        }

        let embed = new EmbedBuilder()
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `Written by ${interaction.user.username}` })
            .setColor(color || COLORS.DEFAULT)
            .setTimestamp()

        if (title) embed.setTitle(title)
        if (message) embed.setDescription(message)

        await interaction.reply({ embeds: [embed] });

    },
};

function isHexColor(color) {
    const hexPattern = /^#([0-9A-Fa-f]{3}){1,2}([0-9A-Fa-f]{2})?$/;
    return hexPattern.test(color);
}