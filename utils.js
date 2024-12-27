const { MessageEmbed } = require("discord.js");

const deprecated = (message) => {
  return new MessageEmbed()
    .setDescription(`This command is deprecated`)
    .setColor(message.guild.me.displayHexColor);
};

module.exports = { deprecated };