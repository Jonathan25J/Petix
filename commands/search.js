const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const search = require('yt-search');

module.exports.run = async (bot, message, args, ops) => {

    var notISVE = new discord.MessageEmbed()
        .setDescription(`❌ You need to be in the same voice channel as the bot`)
        .setColor(message.guild.me.displayHexColor);
    var notISV = false;
    if (message.guild.me.voice.channel) {
        if (message.member.voice.channel !== message.guild.me.voice.channel) notISV = true;
    }
    if (notISV === true) return message.channel.send(notISVE);

    search(args.join(' '), function (err, res) {

        if (!res.videos.length) return message.channel.send("No songs were found");

        var commandFile = require('./play.js');

        commandFile.run(bot, message, [res.videos[0].url], ops);


    });





}





module.exports.help = {
    name: `${prefix}search`
}