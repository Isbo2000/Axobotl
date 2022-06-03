const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  commands: ["woah", "woa"],
  expectedArgs: ["<text and image> or <user>"],
  maxArgs: [1],
  callback: async (message, arguments, text) => {
    //run command
    const canvas = Canvas.createCanvas(478, 478);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "./assets/imagecommands/woah/woah.png"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    let member = message.mentions.users.first();
    if (message.type == "REPLY") {
      const msg = await message.channel.messages.fetch(
        message.reference.messageId
      );

      if (msg.attachments?.size == 1) {
        var link = msg.attachments?.first().url;
        const image = await Canvas.loadImage(link);
        context.drawImage(image, 250, 275, 200, 200);

        if (text) {
          context.font = "25px sans-serif";
          context.fillText(text, 20, 30);

          const attachment = new MessageAttachment(
            canvas.toBuffer(),
            "woah.png"
          );
          message.channel.send({ files: [attachment] });
        } else {
          message.reply("No text provided");
        }
      } else {
        message.reply("The message you replied to has no image");
      }
    } else if (message.attachments?.size == 1) {
      var link = message.attachments.first()?.url;
      const image = await Canvas.loadImage(link);
      context.drawImage(image, 250, 275, 200, 200);

      if (text) {
        context.font = "25px sans-serif";
        context.fillText(text, 20, 30);

        const attachment = new MessageAttachment(canvas.toBuffer(), "woah.png");
        message.channel.send({ files: [attachment] });
      } else {
        message.reply("No text provided");
      }
    } else if (member) {
      if (member.avatar) {
        const image = await Canvas.loadImage(
          "https://cdn.discordapp.com/avatars/" +
            member.id +
            "/" +
            member.avatar +
            ".png"
        );
        context.drawImage(image, 250, 275, 200, 200);

        context.font = "25px sans-serif";
        context.fillText(member.username, 20, 30);

        const attachment = new MessageAttachment(canvas.toBuffer(), "woah.png");
        message.channel.send({ files: [attachment] });
      } else {
        message.reply("User has no avatar");
      }
    } else {
      const attachment = new MessageAttachment(canvas.toBuffer(), "woah.png");
      message.channel.send({ files: [attachment] });
    }
  },
};
