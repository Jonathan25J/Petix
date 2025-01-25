const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('info')
        .setDescription('Get information from a member')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The member you want information from')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = (await interaction.guild.members.fetch({ user: user.id, force: true })); // Force fetch the user

        const embed = new EmbedBuilder()
            .setTitle(`${member.displayName}`)
            .addFields(
                { name: 'Nickname', value: member.nickname || 'unset' },
                { name: 'Status', value: member.presence ? member.presence.status : 'offline' },
                { name: 'ID', value: member.id.toString() },
                {
                    name: 'Joined at', value: new Date(member.joinedTimestamp).toLocaleString(interaction.guild.preferredLocale, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                },
                { name: 'Roles', value: member.roles.cache.map(role => role.toString()).join(', ') }

            )
            .setThumbnail(member.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor(member.displayHexColor || interaction.guild.members.me.displayHexColor)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },
};