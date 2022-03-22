import axolotls from "../../assets/imagecommands/axolotl.json";

export const commands = ["axolotl", "axo"];
export const maxArgs = [0];
export const callback = (message, args, text) => {
  //run command
  const axolotl = Math.floor(Math.random() * axolotls.length);
  message.channel.send(axolotls[axolotl]);
};