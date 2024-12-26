const discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args, client) => {
  const mention = message.mentions.users.first();
  if (!args[0]) {
    var meAvatar = new discord.MessageEmbed()
      .setColor("#34a8eb")
      .addFields({
        name: "Own avatar:",
        value: `${message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
        })}`,
      })
      .setThumbnail(message.author.displayAvatarURL());
    return message.channel.send(meAvatar);
  }

  if ((args[0], mention)) {
    const aPerson = message.mentions.users.first();
    var anAvatar = new discord.MessageEmbed()
      .setColor("#34a8eb")
      .setDescription(
        `**${aPerson.username}'s avatar:**
          ${aPerson.displayAvatarURL({ format: "png", dynamic: true })}`
      )
      .setThumbnail(aPerson.displayAvatarURL());
    return message.channel.send(anAvatar);
  }

  if ((args[0], !mention)) return message.channel.send("Error😕");
};

module.exports.help = {
  name: `avatar`,
  aliases: [`av`],
};
