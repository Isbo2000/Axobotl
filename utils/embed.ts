// This contains the script for generating an embed and that's it
const Discord = require("discord.js");
const config = require("../assets/data/config.json");

const footer = {
  text: "Axobotl   |   Version: " + config.version,
};

export default () =>
    new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setDescription(`prefix: \`${config.prefix}\``)
      .setFooter(footer)
