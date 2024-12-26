const discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./database/warns.json", "utf8"));

module.exports.run = async (bot, message, args, client) => {
  const tWUser = message.mentions.users.first();

  if (!args[0]) return message.channel.send("You need to give a username");

  if (!tWUser) return message.channel.send("player not found");

  if (!warns[tWUser.id])
    warns[tWUser.id] = {
      warns: 0,
    };

  if ((args[0], !args[1])) {
    var avatar = tWUser.avatarURL();
    var embed = new discord.MessageEmbed()
      .setColor("#d61313")
      .setThumbnail(avatar)
      .setTitle(`${tWUser.username}`)
      .addField("total warns:", warns[tWUser.id].warns);

    return message.channel.send(embed);
  }

  if (!args[1].includes("set")) return;

  if (!message.member.hasPermission(`KICK_MEMBERS`))
    return message.channel.send("You don't have the right permission");

  if (args[2] >= 0) {
    if (Number.isInteger(parseInt(args[2]))) {
      warns[tWUser.id].warns = args[2];

      message.channel.send(
        `You have changed ${tWUser} warns to ${warns[tWUser.id].warns}`
      );

      fs.writeFile("./database/warns.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
      });

      return;
    }
  }

  if (args[2] < 0) return message.channel.send("Number must be above 0");
  else message.channel.send("You need to set an amount");
};

module.exports.help = {
  name: `infractions`,
  aliases: [`if`],
};
