const {EmbedBuilder} = require('discord.js');

function createEmbedMessage(guild, message) {
    let color = COLORS.DEFAULT;

    if (guild) color = guild.members.me.displayHexColor;
    
    const embed = new EmbedBuilder()
    .setDescription(message)
    .setColor(color)
    return embed;
}

const COLORS = {
    RED: "#ff4833",
    BLUE: "#0000FF",
    GREEN: "#00FF00",
    GRAY: "#4e5058",
    ORANGE: "#facb3e",
    DEFAULT: '#43c2f1'
};

module.exports = {
    createEmbedMessage, COLORS
};