import frawgs from "../../assets/imagecommands/frawg.json";

export const commands = ["frawg", "frog"];
export const maxArgs = [0];
export const callback = (message, args, text) => {
  //run command
  const frawg = Math.floor(Math.random() * frawgs.length);
  message.channel.send(frawgs[frawg]);
};
