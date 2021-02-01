const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {

    var guildIDData = ops.active.get(message.guild.id);
 
    if (!guildIDData) return message.channel.send("There is no music playing at the moment");
 
    var queue = guildIDData.queue;
    var cPlaying = queue[0];
 
    var response = `Now playing **${cPlaying.songTitle}** [${cPlaying.requester}]\n\nNext: \n`;
 

     if (queue.length > 1) {
    for (var i = 1; i < queue.length; i++) {
 
        response += `${i}) ${queue[i].songTitle} [${queue[i].requester.username}]\n`;
 
    }};

    var queueEmbed = new discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setDescription(response);
    
    message.channel.send(queueEmbed).catch(err => {
    
        if (err)message.channel.send("The playlist is to long to be showed");
    
    });

};





module.exports.help = {
    name: `${prefix}queue`
}