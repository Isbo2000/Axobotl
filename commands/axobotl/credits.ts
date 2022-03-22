import credits from "../../assets/help/credits.json";
import embed_gen from "../../utils/embed";

module.exports = {
  commands: ["credits", "credit", "creds", "cred"],
  callback: async (message, args, text, client) => {
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

    const embed = embed_gen()
      .setTitle("**Credits**")
      .addFields(credit_fields);
    message.channel.send({ embeds: [embed] });
  },
};
