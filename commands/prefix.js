const discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const prefixes = JSON.parse(
  fs.readFileSync("./database/prefixes.json", "utf8")
);

module.exports.run = async (bot, message, args, client) => {
  const guild = message.guild.id;

  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("You can't use this command");

  if (!args[0]) return message.channel.send("You need to give up a prefix");

  if (!prefixes[guild])
    prefixes[guild] = {
      prefix: `.`,
    };

  var old = prefixes[guild].prefix;

  prefixes[guild].prefix = args[0];

  fs.writeFile("./database/prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err);
  });

  var Embed = new discord.MessageEmbed()
    .setColor("#43b581")
    .setDescription(
      `Prefix has been changed from **${old}** to **${prefixes[guild].prefix}**`
    );

  return message.channel.send(Embed);
};

module.exports.help = {
  name: `prefix`,
};
