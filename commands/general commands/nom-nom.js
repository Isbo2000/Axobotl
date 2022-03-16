const assets = require("../../assets/nomnom/index.json");

module.exports = {
  commands: ["nom", "eat", "nomnom"],
  expectedArgs: ["<user/thing>"],
  minArgs: [1],
  maxArgs: [1],
  callback: (message, arguments, text) => {
    //run command
    user = message.author.id;
    rando = Math.floor(Math.random() * assets.length);

    message.channel.send({
      content: `<@${user}> nommed on ${text}`,
      files: [assets[rando]],
    });
  },
};
