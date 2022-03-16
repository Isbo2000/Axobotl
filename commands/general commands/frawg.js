const frawgs = require("../../assets/imagecommands/frawg.json");

module.exports = {
  commands: ["frawg", "frog"],
  maxArgs: [0],
  callback: (message, arguments, text) => {
    //run command
    frawg = Math.floor(Math.random() * frawgs.length);
    message.channel.send(frawgs[frawg]);
  },
};
