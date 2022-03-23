import { MessageAttachment } from "discord.js";
import Canvas from "canvas";

export const commands = ["crttv", "mike", "crtv"];
export const expectedArgs = ["<image> or <user>"];
export const maxArgs = [1];
export const callback = async (message, args, text) => {
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

  let member = message.mentions.users.first();
  if (message.attachments?.size == 1) {
    var link = message.attachments.first()?.url;
    const image = await Canvas.loadImage(link);
    context.drawImage(image, 85, 102.5, 255, 200);

    var w = canvas.width / 2 - 397 / 2;
    var h = canvas.height / 2 - 404 / 2;
    context.drawImage(foreground, w, h, 397, 404);

    const attachment = new MessageAttachment(canvas.toBuffer(), "CRTTV.png");
    message.channel.send({ files: [attachment] });
  } else if (text) {
    if (member) {
      if (member.avatar) {
        const image = await Canvas.loadImage(
          "https://cdn.discordapp.com/avatars/" +
            member.id +
            "/" +
            member.avatar +
            ".png"
        );
        context.drawImage(image, 85, 102.5, 255, 200);

        var w = canvas.width / 2 - 397 / 2;
        var h = canvas.height / 2 - 404 / 2;
        context.drawImage(foreground, w, h, 397, 404);

        const attachment = new MessageAttachment(
          canvas.toBuffer(),
          "CRTTV.png"
        );
        message.channel.send({ files: [attachment] });
      } else {
        message.reply("User has no avatar");
      }
    } else {
      message.reply("Invalid user");
    }
  } else if (message.type == "REPLY") {
    const msg = await message.channel.messages.fetch(
      message.reference.messageId
    );

    if (msg.attachments?.size == 1) {
      var link = msg.attachments?.first().url;
      const image = await Canvas.loadImage(link);
      context.drawImage(image, 85, 102.5, 255, 200);

      var w = canvas.width / 2 - 397 / 2;
      var h = canvas.height / 2 - 404 / 2;
      context.drawImage(foreground, w, h, 397, 404);

      const attachment = new MessageAttachment(
        canvas.toBuffer(),
        "CRTTV.png"
      );
      message.channel.send({ files: [attachment] });
    } else {
      message.reply("The message you replied to has no image");
    }
  } else {
    var w = canvas.width / 2 - 397 / 2;
    var h = canvas.height / 2 - 404 / 2;
    context.drawImage(foreground, w, h, 397, 404);

    const attachment = new MessageAttachment(canvas.toBuffer(), "CRTTV.png");
    message.channel.send({ files: [attachment] });
  }
};