const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args, ops, playlist) => {

    if (!message.member.voice.channel) return message.channel.send("You are not in a voice channel");

    var notISVE = new discord.MessageEmbed()
        .setDescription(`❌ You need to be in the same voice channel as the bot`)
        .setColor(message.guild.me.displayHexColor);
    var notISV = false;
    if (message.guild.me.voice.channel) {
        if (message.member.voice.channel !== message.guild.me.voice.channel) notISV = true;
    }
    if (notISV === true) return message.channel.send(notISVE);

    if (!args[0]) return message.channel.send("You didn't gave an url");

    var validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send("Url is incorrect");

    var info = await ytdl.getInfo(args[0]);

    var time = (await ytdl.getInfo(args[0])).videoDetails.lengthSeconds;

    var data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voice.channel.join().catch(err => {

        return message.channel.send("The bot can't join the channel");

    });

    if (!message.guild.me.voice.channel) return;

    const connection = data.connection
    connection.voice.setDeaf(true).catch(err => console.error(err));

    if (!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    if (!playlist) {
        data.queue.push({
            songTitle: info.videoDetails.title,
            requester: message.author,
            url: args[0],
            announceChannel: message.channel.id,
            color: message.guild.me.displayHexColor,
            duration: time,
            loop: "false"
        });
    }
    if (!data.dispatcher) {

        var joinEmbed = new discord.MessageEmbed()
            .setDescription(`Joined ${message.member.voice.channel}`)
            .setColor(message.guild.me.displayHexColor)

        message.channel.send(joinEmbed);
        Play(client, ops, data, message);
    } else {

        var queueEmbed = new discord.MessageEmbed()
            .setDescription(`Added **${info.videoDetails.title}** to the queue [${message.author}]`)
            .setColor(message.guild.me.displayHexColor)
        message.channel.send(queueEmbed);

    }

    ops.active.set(message.guild.id, data);

}

async function Play(client, ops, data, message) {

    var playEmbed = new discord.MessageEmbed()
        .setDescription(`Now playing **${data.queue[0].songTitle}** [${data.queue[0].requester}]`)
        .setColor(data.queue[0].color);

    client.channels.cache.get(data.queue[0].announceChannel).send(playEmbed).then(msg => {
        msg.delete({ timeout: data.queue[0].duration * 1000 });
    });

    var options = { seek: 3, volume: 1, bitrate: 128000 };

    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: "audioonly" }), options);

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function () {

        Finish(client, ops, this, message);

    });

}

function Finish(client, ops, dispatcher, message) {

    var fetchedData = ops.active.get(dispatcher.guildID);

    if (fetchedData.queue[0].loop === "false") fetchedData.queue.shift();

    if (fetchedData.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetchedData);

        Play(client, ops, fetchedData, message);

    } else {

        ops.active.delete(dispatcher.guildID);

        var voiceChannel = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;

        if (voiceChannel) {

            var leaveEmbed = new discord.MessageEmbed()
                .setDescription(`Left ${voiceChannel}`)
                .setColor(client.guilds.cache.get(dispatcher.guildID).me.displayHexColor);

            message.channel.send(leaveEmbed);

            voiceChannel.leave();
        }

    };

































































    // if (!message.member.voice.channel) return message.channel.send("You are not in a voice channel");

    // if (!args[0]) return message.channel.send("You didn't gave an url");

    // var validate = ytdl.validateURL(args[0]);

    // if (!validate) return message.channel.send("The url is not correct");

    // var info = await ytdl.getInfo(args[0]);

    // var options = { seek: 3, volume: 1 };

    // var channelJoin = message.member.voice.channel.join()
    //     .then(voiceChannel => {
    //         var stream = ytdl(args[0], { filter: 'audioonly' });
    //         var streamDispatcher = voiceChannel.play(stream, options);
    //     })
    //     .catch(console.error);

    // var playEmbed = new discord.MessageEmbed()
    //     .setDescription(`Now playing **${info.videoDetails.title}** [${message.author}]`)
    //     .setColor(message.guild.me.displayHexColor)

    // message.channel.send(playEmbed);




}





module.exports.help = {
    name: `${prefix}play`,
    aliases: [`${prefix}p`]
}