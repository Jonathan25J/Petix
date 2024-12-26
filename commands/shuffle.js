const discord = require("discord.js");
const config = require("../config.json");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {
  var notISVE = new discord.MessageEmbed()
    .setDescription(`❌ You need to be in the same voice channel as the bot`)
    .setColor(message.guild.me.displayHexColor);

  var notISV = false;

  if (message.guild.me.voice.channel) {
    if (message.member.voice.channel !== message.guild.me.voice.channel)
      notISV = true;
  }
  if (notISV === true) return message.channel.send(notISVE);

  var guildIDData = ops.active.get(message.guild.id);

  if (!guildIDData)
    return message.channel.send("There is no music currently playing");

  var queue = guildIDData.queue;

  var queueC = guildIDData.queue[0];

  queue.shift();

  var skipEmbed = new discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setDescription(`Shuffled the queue`);

  message.channel.send(skipEmbed);

  shuffle(queue);

  queue.push(queue[0]);

  queue[0] = queueC;

  function shuffle(queue) {
    var m = queue.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = queue[m];
      queue[m] = queue[i];
      queue[i] = t;
    }

    return queue;
  }
};

module.exports.help = {
  name: `shuffle`,
};
