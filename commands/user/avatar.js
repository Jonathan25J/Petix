const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want the avatar from')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch( { user: user.id, force: true}); // Force fetch the user

        const embed = new EmbedBuilder()
            .setTitle(`🔎 ${member.user.username}'s avatar`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, extension: 'jpg', size: 1024 }))
            .setColor(member.user.hexAccentColor || interaction.guild.members.me.displayHexColor)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },
};