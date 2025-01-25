const { SlashCommandBuilder, InteractionContextType, MessageFlags } = require('discord.js');
const memberInfoCommand = require('./member/info');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('general')
        .setDescription('General command')
        .addSubcommandGroup(group =>
            group.setName('member')
                .setDescription('General member related commands')
                .addSubcommand(memberInfoCommand.data))
        .setContexts(InteractionContextType.Guild),

    async execute(interaction) {
        const subcommandGroup = interaction.options.getSubcommandGroup();
        const subcommand = interaction.options.getSubcommand();

        switch (subcommandGroup) {
            case 'member':
                switch (subcommand) {
                    case 'info':
                        await memberInfoCommand.execute(interaction);
                        break;
                    default:
                        await interaction.reply({ content: 'Unknown subcommand', flags: MessageFlags.Ephemeral });
                        break;
                }
                break;
            default:
                await interaction.reply({ content: 'Unknown subcommand group', flags: MessageFlags.Ephemeral });
                break;
        }
    },
};