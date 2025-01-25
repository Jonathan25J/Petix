const { MessageMentions: { USERS_PATTERN } } = require('discord.js');

function getUserFromMention(interaction, mention) {
    const matches = mention.matchAll(USERS_PATTERN).next().value;

    if (!matches) return;

    const id = mention.replace(/[<@!>]/g, '');
    
    return interaction.client.users.cache.get(id);
}

const COLORS = {
    RED: "#ff4833",
    BLUE: "#0000FF",
    GREEN: "#00FF00",
    GRAY: "#4e5058",
};

module.exports = {
    getUserFromMention, COLORS
};