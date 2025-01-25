const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('info')
        .setDescription('Server information'),

    async execute(interaction) {

        if (!interaction.guild) {
            return await interaction.reply({ content: 'This command can only be used in a server', flags: MessageFlags.Ephemeral });
        }

        if (interaction.guild.available) {
            const guild = interaction.guild;
            const embed = new EmbedBuilder()
                .setTitle(guild.name)
                .addFields(
                    { name: 'Total members', value: guild.memberCount.toString(), inline: true },
                    { name: 'Apps', value: (guild.members.cache.filter((m) => m.user.bot).size + 1).toString(), inline: true },
                    { name: 'Users', value: guild.members.cache.filter((m) => !m.user.bot).size.toString(), inline: true },
                    { name: 'Total roles', value: guild.roles.cache.size.toString(), inline: true},
                    { name: 'Total channels', value: guild.channels.cache.size.toString(), inline: true},
                    {
                        name: 'Created at', value: new Date(guild.createdTimestamp).toLocaleString(guild.preferredLocale, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    },
                    { name: 'Region', value: guild.preferredLocale },
                    { name: 'Owner', value: `<@${guild.ownerId}>` }
                )
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setColor(guild.members.me.displayHexColor)
                .setTimestamp();

            await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: 'Server is not available', flags: MessageFlags.Ephemeral });
        }

    },
};