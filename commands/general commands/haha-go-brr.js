module.exports = {
  commands: ["habr", "brr"],
  expectedArgs: ["<word>"],
  minArgs: [1],
  maxArgs: [1],
  callback: (message, arguments, text) => {
    //run command
    text = text.replace("@everyone", "@еveryone"); // The first "e" here is a cyryllic letter; this prevents actually mentioning anyone
    text = text.replace("@here", "@hеre"); // Same here. They look identical but actually aren't
    text = text.replace("<@", "<\u200B@"); // To prevent mentioning unmentionable roles if the bot has admin
    message.channel.send("HAHA " + text + " go BRRRRRRRRRRRRRRRRRR");
  },
};
