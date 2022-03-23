const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const quotes = require("../../assets/larry.json");

module.exports = {
  commands: ["larry", "asklarry"],
  callback: async (message, arguments, text) => {
    //run command
    var length = arguments.length;
    lotx = text.toLowerCase();

    selection = [];
    for (filter of quotes.filters) {
      if (filter.type == "length") {
        if (length == filter.length) {
          selection = filter.selection;
        }
      } else if (filter.type == "length range") {
        if (filter.lengthMin <= length && length <= filter.lengthMax) {
          selection = filter.selection;
        }
      } else if (filter.type == "trigger") {
        if (filter.triggers.every((trigger) => lotx.includes(trigger))) {
          selection = filter.selection;
        }
      }
    }

    if (selection.length) {
      ran = Math.floor(Math.random() * selection.length);
      quote = selection[ran];
    } else {
      quote = quotes.fallback;
    }

    // This is a very bodgy solution but it works:
    if (quote === null) {
      user = message.author.username;
      quote = `you are ${user}, smh`;
    }

    const applyText = (canvas, quote) => {
      const context = canvas.getContext("2d");
      let fontSize = 100;
      do {
        context.font = `${(fontSize -= 5)}px sans-serif`;
      } while (
        context.measureText(quote).width > canvas.width - 50 &&
        context.measureText(quote).width > 50
      );
      return context.font;
    };
    const canvas = Canvas.createCanvas(478, 478);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "./assets/imagecommands/larry/Larry.png"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#ffffff00";
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.font = applyText(canvas, quote);
    context.textAlign = "center";
    context.fillStyle = "#000000";
    context.fillText(quote, canvas.width - 239, canvas.height / 2.5);
    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      "AllKnowingLarry.png"
    );
    message.channel.send({ files: [attachment] });
  },
};
