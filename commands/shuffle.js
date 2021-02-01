const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {


    var guildIDData = ops.active.get(message.guild.id);

    var queue = guildIDData.queue;

    var queueC = guildIDData.queue[0];

    queue.shift();

    if (!guildIDData) return message.channel.send("There is no music currently playing");

    if (message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("You are not in the same voicechannel as the bot");

    var skipEmbed = new discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Shuffled the queue`);

    message.channel.send(skipEmbed);

    shuffle(queue);

    queue.push(queue[0]);

    queue[0] = queueC;

    function shuffle(queue) {
        var m = queue.length, t, i;

        while (m) {

            i = Math.floor(Math.random() * m--);

            t = queue[m];
            queue[m] = queue[i];
            queue[i] = t;
        }

        return queue;
    }


}





module.exports.help = {
    name: `${prefix}shuffle`
}