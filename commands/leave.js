const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {

    if (!message.guild.me.voice.channel) return message.channel.send("The bot is not in a voice channel")

    if (!message.member.voice.channel) return message.channel.send("You are not in a voice channel");

    if (message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send("You are not in the same voice channel");

    var leaveEmbed = new discord.MessageEmbed()
        .setDescription(`Left ${message.guild.me.voice.channel}`)
        .setColor(message.guild.me.displayHexColor)

    message.channel.send(leaveEmbed);

    message.guild.me.voice.channel.leave();

    ops.active.delete(message.guild.id);

}





module.exports.help = {
    name: `${prefix}leave`
}