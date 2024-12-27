const discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You don't have permission to do that");

  if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("The bot has no permission to do that");

  if (!args[0]) return message.channel.send("Give a number amount");

  if (args[0] >= 1) {
    if (Number.isInteger(parseInt(args[0]))) {
      var amount = parseInt(args[0]) + 1;

      message.channel.bulkDelete(amount).then(() => {
        if (args[0] == 1) {
          message.channel
            .send(`You deleted one message`)
            .then((msg) => msg.delete({ timeout: 5000 }));
        } else {
          message.channel
            .send(`You have deleted ${args[0]} messages`)
            .then((msg) => msg.delete({ timeout: 5000 }));
        }
      });
    }
  }

  if (args[0] <= 0) return message.channel.send(`Number must be or above 1`);
};

module.exports.help = {
  name: `clear`,
  aliases: [`cl`],
};
