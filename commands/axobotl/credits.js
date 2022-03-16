const config = require("../../assets/data/config.json");
const credits = require("../../assets/help/credits.json");
const Discord = require("discord.js");

module.exports = {
  commands: ["credits", "credit", "creds", "cred"],
  callback: async (message, arguments, text, client) => {
    //run command

    const credits_fmatted = await Promise.all(credits.map(
      async credit => {
        const user = await client.users.fetch(credit.id);
        return `<@${credit.id}>|\`${user.tag}\`\n${credit.description}`
      }
    ));
    const credit_fields = credits_fmatted.map(credit => ({name: "\u200B\n", value: credit}));

    const embed = new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setTitle("**Credits**")
      .setDescription("`" + config.prefix + "` (is the bot's prefix)")
      .addFields(credit_fields)
      .setFooter("Axobotl   |   Version: " + config.version);
    message.channel.send({ embeds: [embed] });
  },
};
