const axolotls = require("../../assets/imagecommands/axolotl.json");

module.exports = {
  commands: ["axolotl", "axo"],
  maxArgs: [0],
  callback: (message, arguments, text) => {
    //run command
    axolotl = Math.floor(Math.random() * 64);
    message.channel.send(axolotls[axolotl]);
  },
};
