const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command'),

    async execute(interaction) {
        const commands = await interaction.client.application.commands.fetch();
        const subcommands = [];

        commands.forEach(cmd => {
            if (cmd.options) {
                cmd.options.forEach(option => {
                    // Handle subcommand groups
                    if (option.type === 2) {
                        const subCommandGroup = option;

                        if (subCommandGroup.options) {
                            subCommandGroup.options.forEach(subCmd => {
                                if (subCmd.type === 1) { 
                                    subcommands.push({
                                        name: cmd.name,
                                        id: cmd.id,
                                        groupName: subCommandGroup.name,
                                        subName: subCmd.name,
                                        subDescription: subCmd.description || 'No description available.',
                                        subOptions: subCmd.options
                                            ? subCmd.options.map(opt => ({
                                                name: opt.name,
                                                required: opt.required || false
                                            }))
                                            : []
                                    });
                                }
                            });
                        }
                    }

                    // Handle standalone subcommands
                    if (option.type === 1) {
                        const subCommand = option;
                        subcommands.push({
                            name: cmd.name,
                            id: cmd.id,
                            subName: subCommand.name,
                            subDescription: subCommand.description || 'No description available.',
                            subOptions: subCommand.options
                                ? subCommand.options.map(opt => ({
                                    name: opt.name,
                                    required: opt.required || false
                                }))
                                : []
                        });
                    }
                });
            }
        });

        const subcommandDescriptions = subcommands.map(cmd =>
            `</${cmd.name} ${cmd.groupName ? cmd.groupName + ' ' : ''}${cmd.subName}:${cmd.id}> ` +
            cmd.subOptions
                .map(option => option.required ? `\`[${option.name}]\`` : `\`(${option.name})\``)
                .join(' ') +
            `\n${cmd.subDescription}`
        );

        const embed = new EmbedBuilder()
            .setTitle('Petix Help Menu')
            .setThumbnail(interaction.guild.members.me.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setDescription(subcommandDescriptions.join('\n\n'))
            .setColor(interaction.guild.members.me.displayHexColor);

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },
};
