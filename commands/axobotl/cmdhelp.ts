import commands_list from "../../assets/help/commands.json";
import embed_gen from "../../utils/embed";

export const commands = ["commands", "command", "cmds", "cmd"];
export const callback = (message, args, text) => {
  //run command

  const format = (command) => `\`${command.name}\` | ${command.description}`;

  const fields = commands_list.map((category) => ({
    name: `${category.name}:`,
    value: category.commands.map(format).join("\n"),
  }));

  const embed = embed_gen()
    .setTitle("**Command Menu**")
    .addFields(fields);
    message.channel.send({ embeds: [embed] });
};
