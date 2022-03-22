import { MessageAttachment } from "discord.js";
const Canvas = require("canvas");

module.exports = {
  commands: ["suntzu", "suntzuquote"],
  expectedArgs: ["<text>"],
  minArgs: [1],
  callback: async (message, args, text) => {
    //run command
    const applyText = (text, maxWidth) => {
      const context = canvas.getContext("2d");
      var words = text.split(/[ ]+/);
      var line = "";
      let fontSize = 55;

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.font = `${(fontSize -= 5)}px sans-serif`;
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      context.font = `${(fontSize -= 5)}px sans-serif`;

      if (fontSize < 5) {
        context.font = "5px sans-serif";
      }

      return context.font;
    };
    const canvas = Canvas.createCanvas(1200, 675);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "./assets/imagecommands/suntzu/sun-tzu.png"
    );

    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#ffffff00";
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.font = applyText(text, 750);
    context.textAlign = "center";
    context.fillStyle = "#ffffff";

    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      var words = text.split(/[ ]+/);
      var line = "";

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
    }

    //context.fillText(text, 725, canvas.height / 2.0);

    wrapText(context, text, 725, 150, 750, 75);

    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      "SunTzuFakeQuote.png"
    );

    message.channel.send({ files: [attachment] });
  },
};
