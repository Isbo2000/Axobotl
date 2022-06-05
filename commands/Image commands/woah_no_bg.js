const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const greenscreen = require("../../assets/data/greenscreen");

function normalize(width, maxWidth, height, maxHeight) {
  scaleW = maxWidth / width;
  scaleH = maxHeight / height;
  scale = Math.min(scaleW, scaleH);
  return [Math.floor(width * scale), Math.floor(height * scale)];
}

module.exports = {
  commands: ["woah-bg", "woa-bg", "woabg", "woa-bg"],
  expectedArgs: ["<text> and/or <user/image>"],
  callback: async (message, arguments, text) => {
    waitupMsg = await message.channel.send(
      "This might take a couple seconds, be patient..."
    );
    //run command
    const canvas = Canvas.createCanvas(478, 478);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "./assets/imagecommands/woah/woah.png"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    async function draw(link) {
      const image = await Canvas.loadImage(link);
      greenscreened = await greenscreen.greenscreen(image);
      const [cropped, bound] = greenscreen.crop(greenscreened);
      const [normW, normH] = normalize(cropped.width, 250, cropped.height, 200);

      // We want the subject to be touching the right and/or bottom of the frame
      // if and only if it did that in the original image
      let displacementX;
      if (greenscreened.width - bound.right > 3) {
        // I generously gave it 3 pixels of potential error (it is needed)
        displacementX = Math.min(
          350 - Math.floor(normW / 2),
          canvas.width - normW
        );
      } else {
        displacementX = canvas.width - normW;
      }
      let displacementY;
      if (greenscreened.height - bound.bottom > 3) {
        displacementY = Math.min(
          370 - Math.floor(normH / 2),
          canvas.height - normH
        );
      } else {
        displacementY = canvas.height - normH;
      }

      context.drawImage(cropped, displacementX, displacementY, normW, normH);
    }

    let member = message.mentions.users.first();
    let memberrep = message.mentions.users.first(2)[1];
    if (message.type == "REPLY") {
      const msg = await message.channel.messages.fetch(
        message.reference.messageId
      );

      if (msg.attachments?.size == 1) {
        await draw(msg.attachments?.first().url);

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
      await draw(message.attachments.first()?.url);

      if (member) {
        text = text.replace(member, "");
        if (text == "") {
          text = member.username;
        }
      }
    } else if (member) {
      if (member.avatar) {
        await draw(
          "https://cdn.discordapp.com/avatars/" +
            member.id +
            "/" +
            member.avatar +
            ".png"
        );

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
    message.channel
      .send({ files: [attachment] })
      .then(() => waitupMsg.delete());
  },
};
