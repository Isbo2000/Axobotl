const config = require("../../assets/data/config.json");
const asset = require("../../assets/help/help.json");
import embed_gen from "../../utils/embed";

module.exports = {
  commands: ["help", "help menu", "menu"],
  callback: (message, args, text) => {
    //run command

    const prefix = config.prefix;

    // Help commands
    const commands = asset.commands
      .map(
        (command) => `${command.description}:\n\`${prefix}${command.command}\``
      )
      .join("\n");

    const invite_link = `https://discord.com/api/oauth2/authorize?client_id=${config.client}&permissions=${config.permissions}&scope=bot`;
    // For now the scope is just "bot" since we don't yet have slash commands implemented. yet.
    const invite = `Link to invite this bot to your server:\n**[Invite Me!](${invite_link})**`;

    const embed = embed_gen()
      .setTitle("**Help Menu**")
      .addFields(
        { name: "\u200B", value: asset.graphic.join("\n") },
        { name: "Help:", value: commands },
        { name: "Invite:", value: invite }
      );
    message.channel.send({ embeds: [embed] });
  },
};
