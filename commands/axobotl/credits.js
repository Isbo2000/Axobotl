const config = require("../../assets/data/config.json");
const credits = require("../../assets/help/credits.json");
const embed_gen = require("../../utils/embed.js");

module.exports = {
  commands: ["credits", "credit", "creds", "cred"],
  callback: async (message, arguments, text, client) => {
    //run command

    const credits_fmatted = await Promise.all(
      credits.map(async (credit) => {
        const user = await client.users.fetch(credit.id);
        return `<@${credit.id}>|\`${user.tag}\`\n${credit.description}`;
      })
    );
    const credit_fields = credits_fmatted.map((credit) => ({
      name: "\u200B\n",
      value: credit,
    }));

    const embed = embed_gen
      .embed()
      .setTitle("**Credits**")
      .addFields(credit_fields);
    message.channel.send({ embeds: [embed] });
  },
};
