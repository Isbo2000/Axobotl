const config = require("../../assets/data/config.json");
const commands = require("../../assets/help/commands.json");
const Discord = require("discord.js");

module.exports = {
  commands: ["commands", "command", "cmds", "cmd"],
  callback: (message, arguments, text) => {
    //run command

    const format = command => `\`${command.name}\` | ${command.description}\n`;

    prefix = "\u200b";
    prefix = config.prefix;
    gencmd = commands.general.map(format);
    gencmd = gencmd.join(",");
    gencmd = gencmd.replace(/[,]/g, function ($1) {
      return $1 === "," ? "" : ",";
    });

    imgcmd = commands.image.map(format);;
    imgcmd = imgcmd.join(",");
    imgcmd = imgcmd.replace(/[,]/g, function ($1) {
      return $1 === "," ? "" : ",";
    });

    modcmd = commands.moderation.map(format);;
    modcmd = modcmd.join(",");
    modcmd = modcmd.replace(/[,]/g, function ($1) {
      return $1 === "," ? "" : ",";
    });

    const embed = new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setTitle("**Command Menu**")
      .setDescription("`" + prefix + "` (is the bot's prefix)\n\u200B")
      .addFields(
        { name: "General Commands:", value: gencmd },
        { name: "\u200B\nImage Commands", value: imgcmd },
        { name: "\u200B\nModeration Commands:", value: modcmd }
      )
      .setFooter("Axobotl   |   Version: " + config.version);
    message.channel.send({ embeds: [embed] });
  },
};
