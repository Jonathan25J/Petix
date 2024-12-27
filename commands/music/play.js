const { deprecated } = require("../../utils.js");

module.exports.run = async (client, message, args, ops, playlist) => {
  return message.channel.send(deprecated(message));
}

module.exports.help = {
  name: `play`,
  aliases: [`p`],
};
