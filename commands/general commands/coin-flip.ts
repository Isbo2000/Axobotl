import Discord from "discord.js";

export const commands = ["coin", "flip", "coinflip"];
export const maxArgs = [0];
export const callback = async (message, args, text) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function heads(msg) {
    const embed2 = new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setTitle("**Heads**")
      .setImage("https://i.imgur.com/O7JwjS5.png");
    msg.edit({ embeds: [embed2] });
  }
  function tails(msg) {
    const embed3 = new Discord.MessageEmbed()
      .setColor("#00a4ff")
      .setTitle("**Tails**")
      .setImage("https://i.imgur.com/KjNZAjk.png");
    msg.edit({ embeds: [embed3] });
  }

  const embed = new Discord.MessageEmbed()
    .setColor("#00a4ff")
    .setTitle("***Flipping***")
    .setImage("https://i.imgur.com/woPnNga.gif");
  var msg = await message.channel.send({ embeds: [embed] });
  await sleep(5000);
  const flip = Math.floor(Math.random() * 2);
  if (flip == 0) {
    heads(msg);
  } else if (flip == 1) {
    tails(msg);
  }
};