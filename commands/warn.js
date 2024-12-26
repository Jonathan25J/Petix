const discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./database/warns.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send("You don't have the right permission");

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.channel.send("The bot has no permission to do that");

  if (!args[0]) return message.channel.send("You didn't give a username");

  const warnUser = message.mentions.users.first();

  if (!warnUser) return message.channel.send("Player not found");

  if (!warns[warnUser.id])
    warns[warnUser.id] = {
      warns: 0,
    };

  warns[warnUser.id].warns++;

  var avatar = warnUser.avatarURL();
  const warnMessage = {
    embed: {
      url: "https://discordapp.com",
      color: 16711680,
      timestamp: "2021-01-21T10:58:46.999Z",
      author: {
        name: `${warnUser.username} has been warned!`,
        icon_url: avatar,
      },
      fields: [
        {
          name: "total warns:",
          value: `${warns[warnUser.id].warns}`,
          inline: true,
        },
      ],
    },
  };

  message.channel.send(warnMessage);

  fs.writeFile("./database/warns.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });
};

module.exports.help = {
  name: `warn`,
};
