const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  commands: ["larry", "asklarry"],
  callback: async (message, arguments, text) => {
    //run command
    var length = arguments.length;
    if (length == 0) {
      quote = "Can you say something??";
    } else if (length == 1) {
      ran = Math.floor(Math.random() * 4);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
    } else if (length == 2) {
      ran = Math.floor(Math.random() * 6);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why?";
      }
    } else if (length == 3) {
      ran = Math.floor(Math.random() * 8);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why not?";
      }
      if (ran == 6) {
        quote = "go away";
      }
      if (ran == 7) {
        quote = "why?";
      }
    } else if (length == 4) {
      ran = Math.floor(Math.random() * 10);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why not?";
      }
      if (ran == 6) {
        quote = "go away";
      }
      if (ran == 7) {
        quote = "why?";
      }
      if (ran == 8) {
        quote = "Sureeeeee.. I guess";
      }
      if (ran == 9) {
        quote = "What do you want??";
      }
    } else if (length == 5) {
      ran = Math.floor(Math.random() * 12);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why not?";
      }
      if (ran == 6) {
        quote = "go away";
      }
      if (ran == 7) {
        quote = "why?";
      }
      if (ran == 8) {
        quote = "Sureeeeee.. I guess";
      }
      if (ran == 9) {
        quote = "What do you want??";
      }
      if (ran == 10) {
        quote = "What makes you think I know??";
      }
      if (ran == 11) {
        quote = "ttoottaallyyyy";
      }
    } else if (length == 6) {
      ran = Math.floor(Math.random() * 14);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why not?";
      }
      if (ran == 6) {
        quote = "go away";
      }
      if (ran == 7) {
        quote = "why?";
      }
      if (ran == 8) {
        quote = "Sureeeeee.. I guess";
      }
      if (ran == 9) {
        quote = "What do you want??";
      }
      if (ran == 10) {
        quote = "What makes you think I know??";
      }
      if (ran == 11) {
        quote = "ttoottaallyyyy";
      }
      if (ran == 12) {
        quote = "YES, THATS IT";
      }
      if (ran == 13) {
        quote = "Why even think that??";
      }
    } else if (length == 7) {
      ran = Math.floor(Math.random() * 16);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why not?";
      }
      if (ran == 6) {
        quote = "go away";
      }
      if (ran == 7) {
        quote = "why?";
      }
      if (ran == 8) {
        quote = "Sureeeeee.. I guess";
      }
      if (ran == 9) {
        quote = "What do you want??";
      }
      if (ran == 10) {
        quote = "What makes you think I know??";
      }
      if (ran == 11) {
        quote = "ttoottaallyyyy";
      }
      if (ran == 12) {
        quote = "YES, THATS IT";
      }
      if (ran == 13) {
        quote = "Why even think that??";
      }
      if (ran == 14) {
        quote = "oh.. well.. maybe?";
      }
      if (ran == 15) {
        quote = "oh welp, nothing can be done";
      }
    } else if (length == 8) {
      ran = Math.floor(Math.random() * 18);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why not?";
      }
      if (ran == 6) {
        quote = "go away";
      }
      if (ran == 7) {
        quote = "why?";
      }
      if (ran == 8) {
        quote = "Sureeeeee.. I guess";
      }
      if (ran == 9) {
        quote = "What do you want??";
      }
      if (ran == 10) {
        quote = "What makes you think I know??";
      }
      if (ran == 11) {
        quote = "ttoottaallyyyy";
      }
      if (ran == 12) {
        quote = "YES, THATS IT";
      }
      if (ran == 13) {
        quote = "Why even think that??";
      }
      if (ran == 14) {
        quote = "oh.. well.. maybe?";
      }
      if (ran == 15) {
        quote = "oh welp, nothing can be done";
      }
      if (ran == 16) {
        quote = "yeahhhh, I agree";
      }
      if (ran == 17) {
        quote = "What do you mean?";
      }
    } else if (length == 9) {
      ran = Math.floor(Math.random() * 20);
      if (ran == 0) {
        quote = "yes";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why not?";
      }
      if (ran == 6) {
        quote = "go away";
      }
      if (ran == 7) {
        quote = "why?";
      }
      if (ran == 8) {
        quote = "Sureeeeee.. I guess";
      }
      if (ran == 9) {
        quote = "What do you want??";
      }
      if (ran == 10) {
        quote = "What makes you think I know??";
      }
      if (ran == 11) {
        quote = "ttoottaallyyyy";
      }
      if (ran == 12) {
        quote = "YES, THATS IT";
      }
      if (ran == 13) {
        quote = "Why even think that??";
      }
      if (ran == 14) {
        quote = "oh.. well.. maybe?";
      }
      if (ran == 15) {
        quote = "oh welp, nothing can be done";
      }
      if (ran == 16) {
        quote = "yeahhhh, I agree";
      }
      if (ran == 17) {
        quote = "What do you mean?";
      }
      if (ran == 18) {
        quote = "Woahh, so cool";
      }
      if (ran == 19) {
        quote = "Nope.. definitely not";
      }
    } else if (length >= 10 || length > 15) {
      ran = Math.floor(Math.random() * 23);
      if (ran == 0) {
        quote = "It shall be so";
      }
      if (ran == 1) {
        quote = "no";
      }
      if (ran == 2) {
        quote = "maybe";
      }
      if (ran == 3) {
        quote = "I dont know";
      }
      if (ran == 4) {
        quote = "okay";
      }
      if (ran == 5) {
        quote = "why not?";
      }
      if (ran == 6) {
        quote = "go away";
      }
      if (ran == 7) {
        quote = "why?";
      }
      if (ran == 8) {
        quote = "Sureeeeee.. I guess";
      }
      if (ran == 9) {
        quote = "What do you want??";
      }
      if (ran == 10) {
        quote = "What makes you think I know??";
      }
      if (ran == 11) {
        quote = "ttoottaallyyyy";
      }
      if (ran == 12) {
        quote = "YES, THATS IT";
      }
      if (ran == 13) {
        quote = "Why even think that??";
      }
      if (ran == 14) {
        quote = "oh.. well.. maybe?";
      }
      if (ran == 15) {
        quote = "oh welp, nothing can be done";
      }
      if (ran == 16) {
        quote = "yeahhhh, I agree";
      }
      if (ran == 17) {
        quote = "What do you mean?";
      }
      if (ran == 18) {
        quote = "Woahh, so cool";
      }
      if (ran == 19) {
        quote = "Nope.. definitely not";
      }
      if (ran == 20) {
        quote = "That is never gonna happen";
      }
      if (ran == 21) {
        quote = "uhhhhh...ok...";
      }
      if (ran == 22) {
        quote = "oopsies";
      }
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
