const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const m2iat = require("../../assets/data/message_to_image_and_text");

module.exports = {
  commands: ["crttv", "mike", "crtv"],
  expectedArgs: ["<image> or <user>"],
  maxArgs: [1],
  callback: async (message, arguments, text) => {
    //run command
    const canvas = Canvas.createCanvas(478, 478);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "./assets/imagecommands/crttv/crttv-bg.png"
    );
    const foreground = await Canvas.loadImage(
      "./assets/imagecommands/crttv/crttv-fg.png"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    try {
      const [image, caption] = await m2iat(message, text);
      if (image) {
        context.drawImage(image, 85, 102.5, 255, 200);
      }
      var w = canvas.width / 2 - 397 / 2;
      var h = canvas.height / 2 - 404 / 2;
      context.drawImage(foreground, w, h, 397, 404);
    } catch {
      message.reply("Failed to load image");
      return;
    }
    var w = canvas.width / 2 - 397 / 2;
    var h = canvas.height / 2 - 404 / 2;
    context.drawImage(foreground, w, h, 397, 404);

    const attachment = new MessageAttachment(canvas.toBuffer(), "CRTTV.png");
    message.channel.send({ files: [attachment] });
  },
};
