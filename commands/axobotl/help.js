const config = require("../../assets/data/config.json");
const embed_gen = require("../../utils/embed.js");

module.exports = {
  commands: ["help", "help menu", "menu"],
  callback: (message, arguments, text) => {
    //run command

    prefix = "\u200b";
    prefix = config.prefix;
    help = [
      "≽(^ ᗜ ^)≼       |------------------------------------|",
      "     /(          )/< >|      A multi-purpose axolotl bot       |",
      "         (         )               |                   Made by Isbo2000                    |",
      "         (        )                |------------------------------------|",
    ];
    help = help.join("\n");

    other = [
      "Type this for the list of commands:",
      "`" + prefix + "commands`\n",
      "Type this to see the credits:",
      "`" + prefix + "credits`",
    ];
    other = other.join("\n");

    invite = [
      "Link to invite this bot to your server:",
      "**[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=881548943132098591&permissions=1374393199687&scope=bot)**",
      "\u200B\n",
    ];
    invite = invite.join("\n");

    const embed = embed_gen
      .embed()
      .setTitle("**Help Menu**")
      .addFields(
        { name: "\u200B", value: help },
        { name: "\u200B\nHelp:", value: other },
        { name: "\u200B\nInvite:", value: invite }
      );
    message.channel.send({ embeds: [embed] });
  },
};
