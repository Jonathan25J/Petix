const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;

module.exports.run = async (bot, message, args, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment");

    var queue = guildIDData.queue;
    var cPlaying = queue[0];



    if (!args[0]) {

        var response = `Now playing **${cPlaying.songTitle}** [${cPlaying.requester}]\n\nNext: \n`;


        if (queue.length > 1) {
            for (var i = 1; i <= 25; i++) {

                response += `${i}) ${queue[i].songTitle} [${queue[i].requester.username}]\n`;

            }
        };

        if (queue.length == 26) response += `**(${queue.length - 25} song remaining)**`
        if (queue.length >= 27) response += `**(${queue.length - 25} songs remaining)**`

        var queueEmbed = new discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(response);

        message.channel.send(queueEmbed).catch(err => {

            if (err) {

                var queueEmbed = new discord.MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setDescription(`The queue is too long to be showed (**${guildIDData.queue.length}** songs)`);

                message.channel.send(queueEmbed);
            }

        });
    }

    if (args[0] === "clear") {

        queue = [];

        queue.push(cPlaying);

        guildIDData.queue = queue;

        ops.active.set(message.guild.id, guildIDData);

        var queueCEmbed = new discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Cleared the queue`);

        message.channel.send(queueCEmbed);
    };

    if (args[0] === "loop") {
        var loopHEmbed = new discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`The playlist contains too much songs to be multiplied`);

        if (guildIDData.queue.length > 30) return message.channel.send(loopHEmbed);

        const amount = guildIDData.queue.length * 50;

        for (let i = 0; i < amount; i++) {

            guildIDData.queue.push(guildIDData.queue[i]);


        }

        var loopEmbed = new discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Playlist multiplied with 50 times`);

        message.channel.send(loopEmbed);

        ops.active.set(message.guild.id, guildIDData);

    };


}





module.exports.help = {
    name: `${prefix}queue`
}