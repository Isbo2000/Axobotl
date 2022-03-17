const config = require("../../assets/data/config.json");
const commands = require("../../assets/help/commands.json");
const Discord = require("discord.js");

module.exports = {
  commands: ["commands", "command", "cmds", "cmd"],
  callback: (message, arguments, text) => {
    //run command

    const format = (command) => `\`${command.name}\` | ${command.description}`;

    prefix = config.prefix;

    gencmd = commands.general.map(format).join("\n");
    imgcmd = commands.image.map(format).join("\n");
    modcmd = commands.moderation.map(format).join("\n");

    const embed = new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setTitle("**Command Menu**")
      .setDescription(`prefix: \`${prefix}\``)
      .addFields(
        { name: "General Commands:", value: gencmd },
        { name: "Image Commands", value: imgcmd },
        { name: "Moderation Commands:", value: modcmd }
      )
      .setFooter("Axobotl   |   Version: " + config.version);
    message.channel.send({ embeds: [embed] });
  },
};
