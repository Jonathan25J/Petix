const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const fs = require("fs");
  const prefixes = JSON.parse(
    fs.readFileSync("./database/prefixes.json", "utf8")
  );
  const guild = message.guild.id;
  var prefix;
  if (!prefixes[guild]) prefix = `.`;
  if (prefixes[guild]) prefix = prefixes[guild].prefix;
  // const fs = require("fs");
  // const channelC = JSON.parse(fs.readFileSync("./database/channels.json", "utf8"));
  // const guildID = message.guild.id;
  // var cSelected = channelC[guildID].channel;
  // var channel = message.member.guild.channels.cache.find(channel => channel.name === cSelected);

  var botEmbed = new discord.MessageEmbed()
    .setTitle("Petix help menu")
    .setColor(message.guild.me.displayHexColor)
    .addFields(
      {
        name: "General",
        value:
          "```" +
          `\n${prefix}serverinfo\n${prefix}kick (player) (reason)\n${prefix}ban (player) (reason)\n${prefix}avatar (player)\n${prefix}clear (message amount)\n${prefix}warn (player)\n${prefix}infractions (player) (set) (amount)\n${prefix}emb (title/message/channel/#color)\n${prefix}playerinfo (player)\n${prefix}lockdown\n${prefix}add (player)\n${prefix}remove (player)\n${prefix}prefix (custom prefix)\n${prefix}config\n` +
          "```",
      },
      {
        name: "Music (deprecated)",
        value:
          "```" +
          `\n${prefix}play (url)\n${prefix}search (title)\n${prefix}playlist (playlist url)\n${prefix}loop (true/false)\n${prefix}queue (clear/loop)\n${prefix}shuffle\n${prefix}pause\n${prefix}resume\n${prefix}skip\n${prefix}join\n${prefix}leave\n` +
          "```",
      },
      {
        name: "Config",
        value:
          "```" +
          `\n${prefix}config welcome (set/remove) (channel/message) (message)\n${prefix}config tickets (set/remove) category\n` +
          "```",
      },
      { name: "Prefix", value: "```" + `${prefix}` + "```" }
    )
    .setThumbnail("https://i.imgur.com/Xd0b0Fy.png");

  var prembed = new discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setDescription("❌ I can't send you a private message");

  return message.channel.send(botEmbed);
  //return message.author.send(botEmbed).catch(err => { if (err) message.channel.send(prembed) })
};

module.exports.help = {
  name: `help`,
  aliases: [`info`],
};
