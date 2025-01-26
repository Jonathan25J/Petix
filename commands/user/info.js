const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { DEFAULT } = require('../../utils.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('info')
        .setDescription('Get information from a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want information from')
                .setRequired(true)),

    async execute(interaction) {
        const userId = interaction.options.getUser('user').id;
        const user = await interaction.client.users.fetch(userId, { force: true });

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}`)
            .addFields(
                { name: 'Global name', value: user.globalName || 'unset' },
                { name: 'Display name', value: user.displayName || 'unset' },
                { name: 'ID', value: user.id.toString() },
                {
                    name: 'Joined at', value: new Date(user.createdTimestamp).toLocaleString(DEFAULT.LANGUAGE, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                },

            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor(user.hexAccentColor || DEFAULT.COLOR)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },
};