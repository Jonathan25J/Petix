const discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args, client) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send("You don't have the right permission");

  if (!args[0]) return message.channel.send("You need to give an user");

  var user = message.guild.member(message.mentions.users.first());
  if (!user) return message.channel.send("Player not found");

  if (message.channel.members.find((u) => u.id === user.id))
    return message.channel.send("User is already in this channel");

  var succeed;

  await message.channel
    .updateOverwrite(user, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
      CREATE_INSTANT_INVITE: false,
    })
    .catch((err) => {
      succeed = false;
      return message.channel.send("The bot has not the right permission");
    });

  if (succeed === false) return;

  var added = new discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setDescription(
      `User ${user} has been added to the "${message.channel.name}" channel`
    );

  return message.channel.send(added);
};

module.exports.help = {
  name: `add`,
  aliases: [],
};
