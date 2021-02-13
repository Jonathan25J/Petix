const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;
const moment = require("moment");

module.exports.run = async (client, message, args, ops) => {

   var member = message.guild.member(message.mentions.users.first());
   if (!member) member = message.member;

   var roles = member.roles.cache.size - 1;

   var roleNames = member.roles.cache.map(r => r).join(" ").replace("@everyone", "");
   if (roles == 0) roleNames = `no extra roles`;

   var status = member.presence.status;

   var nickName = member.nickname;
   if (!nickName) nickName = `no nickname`

   var cStatus = member.presence.activities[0] ? member.presence.activities[0].state : `(no status)`;
   if (cStatus == null) cStatus = "(no status)";

   var playerinfo = new discord.MessageEmbed()
   .setColor(member.displayHexColor)
   .addField("Player", member.user.tag)
   .setThumbnail(member.user.avatarURL({size: 4096}))
   .addField("ID", member.id)
   .addField("Nickname", nickName)
   .addField("Status", status)
   .addField("Custom status", cStatus)
   .addField("Account made", moment(member.user.createdAt).format("LLLL"))
   .addField("Joined server", moment(member.joinedAt).format("LLLL" ))
   .addField(`Roles (${roles}) `, roleNames);

   message.channel.send(playerinfo);











}





module.exports.help = {
    name: `${prefix}playerinfo`,
    aliases: [`${prefix}pi`]
}