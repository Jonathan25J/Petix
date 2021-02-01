const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const ytpl = require("ytpl");

module.exports.run = async (bot, message, args, ops) => {

    if (!message.member.voice.channel) return message.channel.send("You are not in a voice channel");

    if (!args[0]) return message.channel.send("You didn't gave an url");

    var data = ops.active.get(message.guild.id) || {};

    if (!data.queue) data.queue = [];
    
    const playlist = await ytpl(args[0]).catch(err => {
    
        if (err)message.channel.send("Incorrect url");

        return;
    
    });

    for (let i = 0; i < playlist.items.length; i++) {

        data.queue.push({
            songTitle: playlist.items[i].title,
            requester: message.author,
            url: playlist.items[i].shortUrl,
            announceChannel: message.channel.id,
            color: message.guild.me.displayHexColor,
            duration: playlist.items[i].durationSec,
            loop: "false"

        });

        ops.active.set(message.guild.id, data);

    }

    var play = require('./play.js');

    play.run(bot, message, [playlist.items[0].shortUrl], ops, playlist);

}





module.exports.help = {
    name: `${prefix}playlist`
}