const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const search = require('yt-search');

module.exports.run = async (bot, message, args, ops) => {

    search(args.join(' '), function (err, res) {

        if (!res.videos.length) return message.channel.send("No songs were found");

        var commandFile = require('./play.js');

        commandFile.run(bot, message, [res.videos[0].url], ops);


    });





}





module.exports.help = {
    name: `${prefix}search`
}