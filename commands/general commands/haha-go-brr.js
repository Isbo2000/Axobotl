module.exports = {
  commands: ["habr", "brr"],
  expectedArgs: ["<word>"],
  minArgs: [1],
  maxArgs: [1],
  callback: (message, arguments, text) => {
    //run command
    text = text.replaceAll("@everyone", "@еveryone"); // The first "e" here is a cyryllic letter; this prevents actually mentioning anyone
    text = text.replaceAll("@here", "@hеre"); // Same here. They look identical but actually aren't
    text = text.replaceAll("<@", "<\u200B@"); // To prevent mentioning unmentionable roles if the bot has admin
    message.channel.send("HAHA " + text + " go BRRRRRRRRRRRRRRRRRR");
  },
};
