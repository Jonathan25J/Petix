const { deprecated } = require("../../utils.js");

module.exports.run = async (bot, message, args, ops) => {
  return message.channel.send(deprecated(message));
};

module.exports.help = {
  name: `loop`,
};
