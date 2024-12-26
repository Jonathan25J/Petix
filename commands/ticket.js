const discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const channelC = JSON.parse(
  fs.readFileSync("./database/channels.json", "utf8")
);
const client = new discord.Client();

module.exports.run = async (bot, message, args) => {
  const guildID = message.guild.id;
  if (!channelC[guildID]) return;
  var categoryId = channelC[guildID].tickets.category;
  var userName = message.author.username;
  var userD = message.author.discriminator;
  var ticketC = false;

  if (!categoryId) return;

  if (args[0].includes("open")) {
    message.guild.channels.cache.forEach((channel) => {
      if (channel.name == "📨" + userName.toLowerCase() + userD) {
        message.channel.send("You already made a ticket");

        ticketC = true;
      }
    });

    if (ticketC == false) {
      message.guild.channels
        .create("📨" + userName + userD, {
          type: "text",
        })
        .then((createdChan) => {
          createdChan.setParent(categoryId).then((settedParent) => {
            settedParent.updateOverwrite(message.author, {
              READ_MESSAGE_HISTORY: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              CONNECT: true,
              CREATE_INSTANT_INVITE: false,
              ADD_REACTIONS: true,
              VIEW_CHANNEL: true,
            });

            settedParent.updateOverwrite(message.client.user, {
              READ_MESSAGE_HISTORY: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              CONNECT: true,
              CREATE_INSTANT_INVITE: false,
              ADD_REACTIONS: true,
              VIEW_CHANNEL: true,
            });

            settedParent
              .updateOverwrite(message.guild.roles.everyone, {
                VIEW_CHANNEL: false,
              })
              .catch((err) => {
                console.log(err);
              });
            var embedParent = new discord.MessageEmbed()
              .setTitle("Hello " + message.author.username.toString() + ",")
              .setColor("#42d4f5")
              .setDescription("You have created a ticket")
              .setThumbnail("https://i.imgur.com/Ggh0Pcs.png");
            settedParent.send(embedParent);
          });
        });
    }
  }

  if (args[0].includes("close")) {
    if (message.channel.parentID == categoryId) {
      if (message.channel.name.includes("📨")) {
        message.channel.delete();

        return;
      }
    }

    message.channel.send("You can't use this command outside ticket channels");
  }
};

module.exports.help = {
  name: `ticket`,
};
