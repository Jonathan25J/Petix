const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command'),

    async execute(interaction) {
        const subcommands = await retrieveSubcommands(interaction);

        subcommands.sort((a, b) => a.rootName.localeCompare(b.rootName));

        const subcommandDescriptions = subcommands.map(subcommand =>
            `</${subcommand.rootName} ${subcommand.groupName ? subcommand.groupName + ' ' : ''}${subcommand.name}:${subcommand.id}> ` +
            subcommand.options
                .map(option => option.required ? `\`[${option.name}]\`` : `\`(${option.name})\``)
                .join(' ') +
            `\n${subcommand.description}`
        );

        const embed = new EmbedBuilder()
            .setTitle('Petix Help Menu')
            .setThumbnail(interaction.guild.members.me.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setDescription(subcommandDescriptions.join('\n\n'))
            .setColor(interaction.guild.members.me.displayHexColor);

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },
};

async function retrieveSubcommands(interaction) {
    const commands = await interaction.client.application.commands.fetch();
    const subcommands = [];

    commands.forEach(command => {
        if (command.options) {
            command.options.forEach(option => {
                // Handle subcommand groups
                if (option.type === 2) {
                    const subcommandGroup = option;

                    if (subcommandGroup.options) {
                        subcommandGroup.options.forEach(option => {
                            if (option.type === 1) {
                                const subcommand = option;
                                subcommands.push(createSubcommandEntry(command, subcommand, subcommandGroup.name));
                            }
                        });
                    }
                }

                // Handle standalone subcommands
                if (option.type === 1) {
                    const subcommand = option;
                    subcommands.push(createSubcommandEntry(command, subcommand));
                }
            });
        }
    });

    return subcommands;
}

function createSubcommandEntry(command, subcommand, groupName = null) {
    return {
        name: subcommand.name,
        description: subcommand.description || 'No description available.',
        options: subcommand.options
            ? subcommand.options.map(option => ({
                name: option.name,
                required: option.required || false
            }))
            : [],
        rootName: command.name,
        id: command.id,
        ...(groupName && { groupName })
    };
}