const config = require("../../assets/data/config.json");
const commands = require("../../assets/help/commands.json");
const Discord = require("discord.js");

module.exports = {
  commands: ["commands", "command", "cmds", "cmd"],
  callback: (message, arguments, text) => {
    //run command

    const format = (command) => `\`${command.name}\` | ${command.description}`;

    prefix = config.prefix;

    const fields = commands.map((category) => ({
      name: `${category.name}:`,
      value: category.commands.map(format).join("\n"),
    }));

    const embed = new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setTitle("**Command Menu**")
      .setDescription(`prefix: \`${prefix}\``)
      .addFields(fields)
      .setFooter("Axobotl   |   Version: " + config.version);
    message.channel.send({ embeds: [embed] });
  },
};
