const {EmbedBuilder} = require('discord.js');

function createEmbedMessage(guild, message) {
    const embed = new EmbedBuilder()
    .setDescription(message)
    .setColor(guild.members.me.displayHexColor)
    return embed;
}

const COLORS = {
    RED: "#ff4833",
    BLUE: "#0000FF",
    GREEN: "#00FF00",
    GRAY: "#4e5058",
    ORANGE: "#facb3e",
};

module.exports = {
    createEmbedMessage, COLORS
};