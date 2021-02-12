const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;

module.exports.run = async (bot, message, args) => {

    var serverIcon = message.guild.iconURL();
    var botEmbed = new discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setThumbnail(serverIcon)
        .setTimestamp()
        .setFooter(`@${message.guild.me.user.username}`)
        .addField("Server", message.guild.name)
        .addField("Owner", message.guild.owner.user.tag)
        .addField("Joined", message.guild.joinedAt)
        .addField("Players", message.guild.members.cache.filter(p => !p.user.bot).size)
        .addField("Bots", message.guild.members.cache.filter(p => p.user.bot).size)
        .addField("Region", message.guild.region);

    return message.channel.send(botEmbed);

}





module.exports.help = {
    name: `${prefix}serverinfo`
}



















































































































































