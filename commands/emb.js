const discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  const fs = require("fs");
  const prefixes = JSON.parse(
    fs.readFileSync("./database/prefixes.json", "utf8")
  );
  const guild = message.guild.id;
  var prefix;
  if (!prefixes[guild]) prefix = `.`;
  if (prefixes[guild]) prefix = prefixes[guild].prefix;

  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send("You can't use this command");

  var seperator = "/";

  if (args[0] == null)
    return message.channel.send(`${prefix}emb (title/message/channel/#color)`);

  var argsEmb = args.join(" ").split(seperator);

  if (argsEmb[3] == undefined) argsEmb[3] = "#fcb603";
  if (argsEmb[2] == undefined) argsEmb[2] = "general";

  var options = {
    title: argsEmb[0],
    message: argsEmb[1] || "No content given",
    color: argsEmb[3].trim(),
    channel: argsEmb[2].trim(),
  };

  var embEmbed = new discord.MessageEmbed()
    .setTitle(options.title)
    .setDescription(options.message)
    .setColor(options.color)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())
    .setFooter(`written by ${message.author.username}`);

  var channel = message.member.guild.channels.cache.find(
    (channel) => channel.name === options.channel
  );
  if (!channel) return message.channel.send("Channel doesn't exist");

  channel.send(embEmbed);
};

module.exports.help = {
  name: `emb`,
};
