const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { COLORS } = require('../../utils.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want the avatar from')
                .setRequired(true)),

    async execute(interaction) {
        const userId = interaction.options.getUser('user').id;
        const user = await interaction.client.users.fetch(userId, { force: true });

        const embed = new EmbedBuilder()
            .setTitle(`🔎 ${user.username}'s avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, extension: 'jpg', size: 1024 }))
            .setColor(user.hexAccentColor || COLORS.DEFAULT)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },
};