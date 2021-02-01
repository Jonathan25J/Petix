const discord = require("discord.js");
const config = require("../config.json");
var prefix = config.prefix;

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have the right permission");

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("The bot has no permission to do that");

  if (!args[0]) return message.channel.send("You didn't give a username");

  if (!args[1]) return message.channel.send("Give a reason");

  const banUser = message.mentions.users.first()

  var reason = args.slice(1).join(" ");

  if (!banUser) return message.channel.send("Player not found");

  var avatar = banUser.avatarURL();
  var kickMessage = new discord.MessageEmbed()
    .setColor("#34a8eb")
    .setThumbnail(avatar)
    .setTimestamp()
    .setDescription(`**Banned:** ${banUser}
    **Reason:** ${reason}`);

  message.channel.send(`Are you sure want to ban ${banUser}?`).then(async msg => {
    message.channel.awaitMessages(author => author.author.id == message.author.id, { max: 1, time: 30000 }).then(collected => {

      if (collected.first().content.toLowerCase() == 'yes') {
        const user = message.guild.member(banUser);
        const guild = message.guild
        guild.members.ban(user).then(() => {
          message.channel.send(kickMessage);
        }).catch(err => {
          if (err) {
            message.channel.send(`Bot can't ban the person`);
          }
        });
      }
    });
  });

}

module.exports.help = {
  name: `${prefix}ban`
}
