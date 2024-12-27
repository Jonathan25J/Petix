const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send("You don't have the right permission");

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.channel.send("The bot has no permission to do that");

  if (!args[0]) return message.channel.send("You didn't give a username");

  if (!args[1]) return message.channel.send("Give a reason");

  const kickUser = message.mentions.users.first();

  var reason = args.slice(1).join(" ");

  if (!kickUser) return message.channel.send("Player not found");

  var avatar = kickUser.avatarURL();
  var kickMessage = new discord.MessageEmbed()
    .setColor("#34a8eb")
    .setThumbnail(avatar)
    .setTimestamp().setDescription(`**Kicked:** ${kickUser}
    **Reason:** ${reason}`);

  message.channel
    .send(`Are you sure want to kick ${kickUser}?`)
    .then(async (msg) => {
      message.channel
        .awaitMessages((author) => author.author.id == message.author.id, {
          max: 1,
          time: 30000,
        })
        .then((collected) => {
          if (collected.first().content.toLowerCase() == "yes") {
            const user = message.guild.member(kickUser);
            user
              .kick(reason)
              .then(() => {
                message.channel.send(kickMessage);
              })
              .catch((err) => {
                if (err) {
                  message.channel.send(`Bot can't kick the person`);
                }
              });
          }
        });
    });
};

module.exports.help = {
  name: `kick`,
};
