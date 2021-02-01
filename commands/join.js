const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;

module.exports.run = async (bot, message, args, ops) => {

    if (!message.member.voice.channel) return message.channel.send("You are not in a voice channel");

    if (message.guild.me.voice.channel) return;

    message.member.voice.channel.join().then(connection => {
        connection.voice.setDeaf(true).catch(err => console.error(err));
    }).catch(err => {
        return message.channel.send("The bot can't join the channel");
    });

    var joinEmbed = new discord.MessageEmbed()
        .setDescription(`Joined ${message.member.voice.channel}`)
        .setColor(message.guild.me.displayHexColor)

    return message.channel.send(joinEmbed);
















}





module.exports.help = {
    name: `${prefix}join`
}