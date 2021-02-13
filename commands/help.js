const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;


module.exports.run = async (bot, message, args) => {
    // const fs = require("fs");
    // const channelC = JSON.parse(fs.readFileSync("./database/channels.json", "utf8"));
    // const guildID = message.guild.id;
    // var cSelected = channelC[guildID].channel;             
    // var channel = message.member.guild.channels.cache.find(channel => channel.name === cSelected);

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Petix help menu")
        .setColor(message.guild.me.displayHexColor)
        .addFields(
            { name: "General", value: "```.serverinfo\n.kick (player) (reason)\n.ban (player) (reason)\n.avatar (player)\n.clear (message amount)\n.warn (player)\n.infractions (player) (set) (amount)\n.emb (title/message/channel/#color)\n.playerinfo (player)\n.lockdown\n.config```\n \n \n "},
            { name: "Music", value: "```.serverinfo\n.play (url)\n.search (title)\n.playlist (playlist url)\n.loop (true/false)\n.queue (clear/loop)\n.shuffle\n.pause\n.resume\n.skip\n.join\n.leave```"},
            { name: "Config", value: "```.config welcome (set/remove) (channel/message) (message) \n.config tickets (set/remove) category```"},
        )
        
        .setThumbnail("https://i.imgur.com/Xd0b0Fy.png");
    return message.channel.send(botEmbed);

}





module.exports.help = {
    name: `${prefix}help`,
    aliases: [`${prefix}info`]
}



















































































































































