const discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music currently playing");

    var notISVE = new discord.MessageEmbed()
        .setDescription(`❌ You need to be in the same voice channel as the bot`)
        .setColor(message.guild.me.displayHexColor);
    var notISV = false;
    if (message.guild.me.voice.channel) {
        if (message.member.voice.channel !== message.guild.me.voice.channel) notISV = true;
    }
    if (notISV === true) return message.channel.send(notISVE);

    var resumeEmbed = new discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Resume playing`);

    message.channel.send(resumeEmbed);

    guildIDData.dispatcher.resume();














}





module.exports.help = {
    name: `resume`
}