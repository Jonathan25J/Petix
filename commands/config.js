const discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const channelC = JSON.parse(fs.readFileSync("./database/channels.json", "utf8"));

module.exports.run = async (bot, message, args, client) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You can't use this command");

    if (!args[0]) {
        var confEmbed = new discord.MessageEmbed()
            .setTitle("Config commands")
            .setColor("#34a8eb")
            .addField("Options:", "```.config welcome (set/remove) (channel/message) (message) \n.config tickets (set/remove) category```")
            .setThumbnail("https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395874-settings_80622.png");

        return message.channel.send(confEmbed);
    }

    if (args[0].includes("welcome")) {

        if (args[0].includes("welcome"), !args[1]) return message.channel.send("Use set or remove");

        if (args[1].includes("set")) {

            if (args[1].includes("set"), !args[2]) return message.channel.send("Set channel or message");

            if (args[2].includes("channel")) {

                const guildID = message.guild.id;
                const channelW = message.channel.name;
                const messageW = ''
                if (!channelC[guildID]) channelC[guildID] = {
                    welcome: {
                        channel: (channelW),
                        message: (messageW)
                    },
                };
                channelC[guildID].welcome.channel = channelW;
                message.channel.send(`You have changed your welcome channel to "${channelW}"`);
            };

            if (args[2].includes("message")) {

                if (args[2].includes("message"), !args[3]) return message.channel.send("You didn't give any text");

                const guildID = message.guild.id;
                const channelW = ""
                const messageW = args.slice(3).join(` `)

                if (!channelC[guildID]) channelC[guildID] = {
                    welcome: {
                        channel: (channelW),
                        message: (messageW)
                    },
                };
                channelC[guildID].welcome.message = messageW;
                message.channel.send(`You have changed your welcome message to "${messageW}"`);
            }
        }
        if (args[1].includes("remove")) {
            const empty = ''
            const guildID = message.guild.id;
            channelC[guildID].welcome.channel = empty;
            channelC[guildID].welcome.message = empty;

            message.channel.send(`You have disabled welcome messages`);
        };
    }

    if (args[0].includes("tickets")) {

        if (!args[1]) return message.channel.send("Set or remove category")

        if (args[1].includes("set")) {
            if (!args[2]) return;
            if (args[2].includes("category")) {
                const guildID = message.guild.id;
                const category = message.channel.parentID;
                const categoryName = message.channel.parent.name;

                if (!channelC[guildID].tickets) channelC[guildID].tickets = {
                };

                channelC[guildID].tickets.category = category;
                message.channel.send(`Tickets are set in the "${categoryName}" category`);
            }
        }

        if (args[1].includes("remove")) {
            if (!args[2]) return;
            if (args[2].includes("category")) {
                const empty = ''
                const guildID = message.guild.id;

                channelC[guildID].tickets.category = empty;

                message.channel.send("Category has been removed")

            }
        }
    };








    fs.writeFile("./database/channels.json", JSON.stringify(channelC), (err) => {
        if (err) console.log(err);
    });




}





module.exports.help = {
    name: `config`
}



















































































































































