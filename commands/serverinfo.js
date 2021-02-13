const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const moment = require("moment");

module.exports.run = async (bot, message, args) => {

    var serverIcon = message.guild.iconURL();
    var botEmbed = new discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setThumbnail(serverIcon)
        .setTimestamp()
        .addField("Total members", message.guild.memberCount, true)
        .addField("Bots", message.guild.members.cache.filter(p => p.user.bot).size, true)
        .addField("Players", message.guild.members.cache.filter(p => !p.user.bot).size, true)
        .addField("Server", message.guild.name)
        .addField("ID", message.guild.id)
        .addField("Owner", message.guild.owner.user.tag)
        .addField("Created on", moment(message.guild.createdAt).format("LLLL"))
        .addField("Region", message.guild.region);

    return message.channel.send(botEmbed);

}





module.exports.help = {
    name: `${prefix}serverinfo`,
    aliases: [`${prefix}si`]
}



















































































































































