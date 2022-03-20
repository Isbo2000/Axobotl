// This contains the script for generating an embed and that's it
const Discord = require("discord.js");
const config = require("./config.json");

module.exports = {
  embed: () =>
    new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setDescription(`prefix: \`${config.prefix}\``)
      .setFooter("Axobotl   |   Version: " + config.version),
};
