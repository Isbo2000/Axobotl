const config = require("../../assets/data/config.json");
const commands = require("../../assets/help/commands.json");
const Discord = require("discord.js");

module.exports = {
  commands: ["commands", "command", "cmds", "cmd"],
  callback: (message, arguments, text) => {
    //run command

    const format = (command) => `\`${command.name}\` | ${command.description}`;

    prefix = "\u200b";
    prefix = config.prefix;

    gencmd = commands.general.map(format).join("\n");
    imgcmd = commands.image.map(format).join("\n");
    modcmd = commands.moderation.map(format).join("\n");

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
