const config = require("../../assets/data/config.json");
const commands = require("../../assets/help/commands.json");
import embed_gen from "../../utils/embed";

module.exports = {
  commands: ["commands", "command", "cmds", "cmd"],
  callback: (message, args, text) => {
    //run command

    const format = (command) => `\`${command.name}\` | ${command.description}`;

    const fields = commands.map((category) => ({
      name: `${category.name}:`,
      value: category.commands.map(format).join("\n"),
    }));

    const embed = embed_gen()
      .setTitle("**Command Menu**")
      .addFields(fields);
    message.channel.send({ embeds: [embed] });
  },
};
