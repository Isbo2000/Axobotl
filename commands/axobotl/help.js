const config = require("../../assets/data/config.json");
const Discord = require("discord.js");

module.exports = {
  commands: ["help", "help menu", "menu"],
  callback: (message, arguments, text) => {
    //run command

    prefix = "\u200b";
    prefix = config.prefix;
    help = [
      "≽(^ ᗜ ^)≼       |------------------------------------|\n",
      "     /(          )/< >|      A multi-purpose axolotl bot       |\n",
      "         (         )               |                   Made by Isbo2000                    |\n",
      "         (        )                |------------------------------------|",
    ];
    help = help.join(",");
    help = help.replace(/[,]/g, function ($1) {
      return $1 === "," ? "" : ",";
    });

    other = [
      "Type this for the list of commands:\n",
      "`" + prefix + "commands`\n\n",
      "Type this to see the credits:\n",
      "`" + prefix + "credits`\n",
    ];
    other = other.join(",");
    other = other.replace(/[,]/g, function ($1) {
      return $1 === "," ? "" : ",";
    });

    invite = [
      "Link to invite this bot to your server:\n",
      "**[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=881548943132098591&permissions=1374393199687&scope=bot)**",
      "\n\u200B\n",
    ];
    invite = invite.join(",");
    invite = invite.replace(/[,]/g, function ($1) {
      return $1 === "," ? "" : ",";
    });

    const embed = new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setTitle("**Help Menu**")
      .setDescription("`" + prefix + "` (is the bot's prefix)\n")
      .addFields(
        { name: "\u200B", value: help },
        { name: "\u200B\nHelp:", value: other },
        { name: "\u200B\nInvite:", value: invite }
      )
      .setFooter("Axobotl   |   Version: " + config.version);
    message.channel.send({ embeds: [embed] });
  },
};
