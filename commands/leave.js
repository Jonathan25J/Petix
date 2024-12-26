const discord = require("discord.js");
const config = require("../config.json");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {
  if (!message.guild.me.voice.channel)
    return message.channel.send("The bot is not in a voice channel");

  if (!message.member.voice.channel)
    return message.channel.send("You are not in a voice channel");

  var notISVE = new discord.MessageEmbed()
    .setDescription(`❌ You need to be in the same voice channel as the bot`)
    .setColor(message.guild.me.displayHexColor);
  var notISV = false;
  if (message.guild.me.voice.channel) {
    if (message.member.voice.channel !== message.guild.me.voice.channel)
      notISV = true;
  }
  if (notISV === true) return message.channel.send(notISVE);

  var leaveEmbed = new discord.MessageEmbed()
    .setDescription(`Left ${message.guild.me.voice.channel}`)
    .setColor(message.guild.me.displayHexColor);

  message.channel.send(leaveEmbed);

  message.guild.me.voice.channel.leave();

  ops.active.delete(message.guild.id);
};

module.exports.help = {
  name: `leave`,
};
