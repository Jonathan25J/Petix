const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;

module.exports.run = async (bot, message, args) => {

    var serverIcon = message.guild.iconURL();
    var botEmbed = new discord.MessageEmbed()
        .setTitle("Serverinfo")
        .setColor("#eba434")
        .setThumbnail(serverIcon)
        .setFooter("Search ID https://discord.id/")
        .addFields(
            { name: "Server", value: message.guild.name },
            { name: "Created", value: message.guild.createdAt },
            { name: "Owner (ID)", value: message.guild.ownerID },
            { name: "Members", value: message.guild.memberCount },
            { name: "Joined", value: message.guild.joinedAt },
            { name: "Region", value: message.guild.region }
        );
    return message.channel.send(botEmbed);

}





module.exports.help = {
    name: `${prefix}serverinfo`
}



















































































































































