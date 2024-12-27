const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var lockdown = true;

  var array = message.channel
    .rolePermissions(message.guild.roles.everyone)
    .toArray();

  for (let index = 0; index < array.length; index++) {
    if (array[index] === `SEND_MESSAGES`) lockdown = false;
  }

  var nPermission = new discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setDescription(`❌ You don't have the permission to do that`);

  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(nPermission);

  if (lockdown === false) {
    message.channel
      .updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false })
      .then(() => {
        var lFEmbed = new discord.MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`✔ The channel ${message.channel} is in a lockdown!`);

        return message.channel.send(lFEmbed);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (lockdown === true) {
    message.channel
      .updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true })
      .then(() => {
        var lREmbed = new discord.MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(
            `✔ The channel ${message.channel} is out of a lockdown!`
          );

        return message.channel.send(lREmbed);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports.help = {
  name: `lockdown`,
  aliases: [`ld`],
};
