const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  commands: ["text"],
  expectedArgs: [],
  minArgs: [1],
  callback: async (message, arguments, text) => {
    //run command
    const applyText = (canvas, text) => {
      const context = canvas.getContext("2d");

      let fontSize = 100;

      do {
        context.font = `${(fontSize -= 5)}px sans-serif`;
      } while (context.measureText(text).width > canvas.width - 50);

      if (fontSize < 5) {
        context.font = "5px sans-serif";
      }

      return context.font;
    };
    const canvas = Canvas.createCanvas(1000, 250);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "./assets/imagecommands/text/text.png"
    );

    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#ffffff00";
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.font = applyText(canvas, text);
    context.textAlign = "left";
    context.fillStyle = "#ffffff";
    context.fillText(text, 50, 125);

    const attachment = new MessageAttachment(canvas.toBuffer(), "Text.png");

    message.channel.send({ files: [attachment] });
  },
};
