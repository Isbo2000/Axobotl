const axolotls = require("../../assets/imagecommands/axolotl.json");

module.exports = {
  commands: ["axolotl", "axo"],
  maxArgs: [0],
  callback: async (message, arguments, text) => {
    //run command
    axolotl = Math.floor(Math.random() * axolotls.length);
    message.channel.send(axolotls[axolotl]);
  },
};
