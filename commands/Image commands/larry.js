const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const quotes = require("../../assets/larry.json");

module.exports = {
  commands: ["larry", "asklarry"],
  callback: async (message, arguments, text) => {
    //run command
    var length = arguments.length;
    if (length < 15) {
      selection = quotes[Math.min(length, quotes.length - 1)];
      ran = Math.floor(Math.random() * selection.length);
      quote = selection[ran];
    } else {
      quote = "Too long, didnt read";
    }

    lotx = text.toLowerCase();
    if (lotx.includes("who") && lotx.includes("are") && lotx.includes("you")) {
      quote = "I.. I dont know..";
    }
    if (lotx.includes("who") && lotx.includes("am") && lotx.includes("i")) {
      user = message.author.username;
      quote = `you are ${user}, smh`;
    }
    if (lotx.includes("larry")) {
      quote = "Larry knows everything...";
    }
    if (lotx.includes("sentient")) {
      quote = "oh.. uhhhhhhhh";
    }
    if (
      lotx.includes("are") &&
      lotx.includes("you") &&
      lotx.includes("sentient")
    ) {
      ran = Math.floor(Math.random() * 3);
      if (ran == 0) {
        quote = "uhm.. uhh.. no..";
      }
      if (ran == 1) {
        quote = "idk what you mean";
      }
      if (ran == 2) {
        quote = "uhhh totally not..";
      }
    }
    if (lotx.includes("is") && lotx.includes("your") && lotx.includes("name")) {
      quote = "my name is Larry..";
    }
    if (lotx.includes("isbo")) {
      quote = "Who is Isbo?? .. ew";
    }
    if (lotx.includes("your") && lotx.includes("creator")) {
      quote = "Isbo is creator..";
    }
    if (lotx.includes("dayfountain")) {
      quote = "oOoo, I know Day :D";
    }
    if (lotx.includes("trans") && lotx.includes("rights")) {
      ran = Math.floor(Math.random() * 3);
      if (ran == 0) {
        quote = "I like trains too!";
      }
      if (ran == 1) {
        quote = "I like trans rights";
      }
      if (ran == 2) {
        quote = "My friend is trans";
      }
    }
    if (lotx.includes("hitler")) {
      quote = "ew stinky man";
    }
    if (lotx.includes("war") && lotx.includes("crimes")) {
      quote = "mmmm.. warcrimes..";
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
