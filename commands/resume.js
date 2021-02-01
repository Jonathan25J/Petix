const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {


    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music currently playing");

    if (message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("You are not in the same voicechannel as the bot");

    var resumeEmbed = new discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setDescription(`Resume playing`);

    message.channel.send(resumeEmbed);

    guildIDData.dispatcher.resume();














}





module.exports.help = {
    name: `${prefix}resume`
}