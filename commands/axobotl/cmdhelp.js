const config = require("../../assets/data/config.json");
const commands = require("../../assets/help/commands.json");
const embed_gen = require("../../assets/data/embed.js");

module.exports = {
  commands: ["commands", "command", "cmds", "cmd"],
  callback: async (message, arguments, text) => {
    //run command

    const format = (command) =>
      `\`${config.prefix}${command.name}\` | ${command.description}`;

    prefix = config.prefix;

    const fields = commands.map((category) => ({
      name: `${category.name}:`,
      value: category.commands.map(format).join("\n"),
    }));

    const embed = embed_gen
      .embed()
      .setTitle("**Command Menu**")
      .addFields(fields);
    message.channel.send({ embeds: [embed] });
  },
};
