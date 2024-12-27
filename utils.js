import { MessageEmbed } from "discord.js";

export const deprecated = (message) => {
  return new MessageEmbed()
    .setDescription(`This command is deprecated`)
    .setColor(message.guild.me.displayHexColor);
};