const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

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

    let member = message.mentions.users.first();
    let memberrep = message.mentions.users.first(2)[1];
    if (message.type == "REPLY") {
      const msg = await message.channel.messages.fetch(
        message.reference.messageId
      );

      if (msg.attachments?.size == 1) {
        var link = msg.attachments?.first().url;
        try {
          const image = await Canvas.loadImage(link);
          context.drawImage(image, 250, 275, 200, 200);
        } catch {
          message.channel.send("Failed to load image");
          return;
        }

        if (memberrep) {
          text = text.replace(memberrep, "");
          if (text == "") {
            text = memberrep.username;
          }
        }
      } else {
        message.reply("The message you replied to has no image");
      }
    } else if (message.attachments?.size == 1) {
      var link = message.attachments.first()?.url;
      try {
        const image = await Canvas.loadImage(link);
        context.drawImage(image, 250, 275, 200, 200);
      } catch {
        message.channel.send("Failed to load image");
        return;
      }

      if (member) {
        text = text.replace(member, "");
        if (text == "") {
          text = member.username;
        }
      }
    } else if (member) {
      if (member.avatar) {
        try {
          const image = await Canvas.loadImage(
            "https://cdn.discordapp.com/avatars/" +
              member.id +
              "/" +
              member.avatar +
              ".png"
          );
          context.drawImage(image, 250, 275, 200, 200);
        } catch {
          message.channel.send("Failed to load image");
          return;
        }

        text = text.replace(member, "");
        if (text == "") {
          text = member.username;
        }
      } else {
        message.reply("User has no avatar");
      }
    }
    if (text) {
      context.font = "25px sans-serif";
      context.fillStyle = "#4c494c";
      context.fillText(text, 15, 30);
    }
    const attachment = new MessageAttachment(canvas.toBuffer(), "woah.png");
    message.channel.send({ files: [attachment] });
  },
};
