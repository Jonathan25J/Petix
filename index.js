const discord = require("discord.js");
const config = require("./config.json");
require('dotenv').config()

const active = new Map();

// command handler
const fs = require("fs");
const path = require('path');
const client = new discord.Client();

// command handler
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

client.login(process.env.BOT_TOKEN);

// command handler
function readCommands(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) console.log(err);

        if (stat.isDirectory()) {
          readCommands(filePath);
        } else if (file.split('.').pop() === 'js') {
          var fileGet = require(filePath);

          client.commands.set(fileGet.help.name, fileGet);

          if (fileGet.help.aliases) {
            fileGet.help.aliases.forEach((w) => {
              client.aliases.set(w, fileGet.help.name);
            });
          }
        }
      });
    });
  });
}

readCommands(path.join(__dirname, 'commands'));

client.on("ready", async () => {
  console.log(`The bot ${client.user.username} is online.`);
  client.user.setActivity(".help");
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.channel.type == "dm") return;

  const prefixes = JSON.parse(
    fs.readFileSync("./database/prefixes.json", "utf8")
  );
  const guild = message.guild.id;

  var prefix;

  if (prefixes[guild]) prefix = prefixes[guild].prefix;

  if (!prefixes[guild]) prefix = config.prefix;

  var messageAray = message.content.split(" ");

  var command = messageAray[0];

  if (!message.content.startsWith(prefix)) return;

  // command handler
  var arguments = messageAray.slice(1);

  var commands =
    client.commands.get(command.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(command.slice(prefix.length)));

  var ops = {
    active: active,
  };

  if (commands) commands.run(client, message, arguments, ops);
});

client.on("guildMemberAdd", (member) => {
  const channelC = JSON.parse(
    fs.readFileSync("./database/channels.json", "utf8")
  );
  const guildID = member.guild.id;

  if (!channelC[guildID].welcome) return;
  var message = channelC[guildID].welcome.message;

  if (!message) return;
  var cSelected = channelC[guildID].welcome.channel;
  var channel = member.guild.channels.cache.find(
    (channel) => channel.name === cSelected
  );
  if (!channel) return;

  channel.send(`${member} ${message}`);
});
