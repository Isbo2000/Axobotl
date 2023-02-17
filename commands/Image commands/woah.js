const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const m2iat = require("../../modules/message_to_image_and_text");

module.exports = {
  commands: ["woah", "woa"],
  expectedArgs: ["<text> and/or <user/image>"],
  callback: async (message, arguments, text) => {
    //run command
    const canvas = Canvas.createCanvas(478, 478);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "./assets/imagecommands/woah/woah.png"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    try {
      const [image, caption] = await m2iat(message, text);
      if (image) {
        context.drawImage(image, 250, 275, 200, 200);
      }
      if (caption) {
        context.font = "25px sans-serif";
        context.fillStyle = "#4c494c";
        context.fillText(caption, 15, 30);
      }
    } catch {
      message.reply("Failed to load image");
      return;
    }
    const attachment = new MessageAttachment(canvas.toBuffer(), "woah.png");
    message.channel.send({ files: [attachment] });
  },
};
