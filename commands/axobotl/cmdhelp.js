const config = require("../../assets/data/config.json");
const Discord = require("discord.js");

module.exports = {
  commands: ["commands", "command", "cmds", "cmd"],
  callback: (message, arguments, text) => {
    //run command

    prefix = "\u200b";
    prefix = config.prefix;
    gencmd = [
      "`" + prefix + "frawg` | sends a random frog image\n",
      "`" + prefix + "axolotl` | sends a random image of an axolotl\n",
      "`" + prefix + "updown` | sends the text back, but upsidedown\n",
      "`" + prefix + "habr` | sends 'HAHA <word> go BRRRRRRRRRRRRRRRRRR'\n",
      "`" + prefix + "nom <user/thing>` | eats the user or thing\n",
      "`" + prefix + "coin` | flips an axolotl coin\n",
    ];
    gencmd = gencmd.join(",");
    gencmd = gencmd.replace(/[,]/g, function ($1) {
      return $1 === "," ? "" : ",";
    });

    imgcmd = [
      "`" + prefix + "suntzu <text>` | makes a fake Sun Tzu quote\n",
      "`" + prefix + "larry <text>` | sends larry [ask a question?]\n",
      "`" + prefix + "text <text>` | sends what you say as an image\n",
      "`" + prefix + "crttv <image/user>` | sends image on CRTTV\n",
    ];
    imgcmd = imgcmd.join(",");
    imgcmd = imgcmd.replace(/[,]/g, function ($1) {
      return $1 === "," ? "" : ",";
    });

    modcmd = [
      "`" +
        prefix +
        "clear` | clears the last 49 messages(yes its exactly 49)\n",
      "`" +
        prefix +
        "kick <user> <reason>` | kicks the specified user from the server\n",
      "`" +
        prefix +
        "ban <user> <reason>` | bans the specified user from the server\n",
      "`" +
        prefix +
        "unban <userID>` | unbans the user specified from their user ID\n",
      "\u200B\n",
    ];
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
