let mapping = require("../../assets/updown.json");
for (i in mapping) {
  mapping[mapping[i]] = i;
}

module.exports = {
  commands: ["updown", "upsidedown"],
  expectedArgs: ["<text>"],
  minArgs: [1],
  callback: (message, arguments, text) => {
    //run command
    hi = text;
    text = hi;
    let Rarray = text.split("");
    let reverseArray = Rarray.reverse();
    let result = reverseArray
      .map((character) => (mapping[character] ? mapping[character] : character))
      .join("");
    result = result.replace("@everyone", "@еveryone"); // The first "e" here is a cyryllic letter; this prevents actually mentioning anyone
    result = result.replace("@here", "@hеre"); // Same here. They look identical but actually aren't
    result = result.replace("<@", "<\u200B@"); // To prevent mentioning unmentionable roles if the bot has admin
    message.channel.send(result);
  },
};
