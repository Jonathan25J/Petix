const discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send("You don't have the right permission");

  if (!args[0]) return message.channel.send("You need to give an user");

  var user = message.guild.member(message.mentions.users.first());
  if (!user) return message.channel.send("Player not found");

  if (!message.channel.members.find((u) => u.id === user.id))
    return message.channel.send("User is not in this channel");

  var succeed;

  message.channel.permissionOverwrites.get(user.id).delete();

  if (succeed === false) return;

  var deleted = new discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setDescription(
      `User ${user} has been removed from the "${message.channel.name}" channel`
    );

  return message.channel.send(deleted);
};

module.exports.help = {
  name: `remove`,
  aliases: [],
};
