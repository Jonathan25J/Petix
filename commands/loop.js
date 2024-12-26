const discord = require("discord.js");
const config = require("../config.json");
const ytpl = require("ytpl");

module.exports.run = async (bot, message, args, ops) => {
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

  if (!args[0]) return message.channel.send("Set it to true or false");

  var data = ops.active.get(message.guild.id) || {};

  if (args[0].toLowerCase() === "true") {
    if (data.queue[0].loop === "false") {
      var trueEmbed = new discord.MessageEmbed()
        .setDescription(`Loop is enabled`)
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(trueEmbed);
    }

    data.queue[0].loop = "true";
    return;
  }

  if (args[0].toLowerCase() === "false") {
    if (data.queue[0].loop === "true") {
      var trueEmbed = new discord.MessageEmbed()
        .setDescription(`Loop is disabled`)
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(trueEmbed);
    }

    data.queue[0].loop = "false";
  }
};

module.exports.help = {
  name: `loop`,
};
