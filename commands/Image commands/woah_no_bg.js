const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const greenscreen = require("../../modules/greenscreen");
const m2iat = require("../../modules/message_to_image_and_text");

function normalize(width, maxWidth, height, maxHeight) {
  scaleW = maxWidth / width;
  scaleH = maxHeight / height;
  scale = Math.min(scaleW, scaleH);
  return [Math.floor(width * scale), Math.floor(height * scale)];
}

async function draw(image, canvas, context) {
  // Crops the transparency out of the image and places it in the appropriate spot
  const [cropped, bound] = greenscreen.crop(image);
  const [normW, normH] = normalize(cropped.width, 250, cropped.height, 200);

  // We want the subject to be touching the right and/or bottom of the frame
  // if and only if it did that in the original image
  let displacementX;
  if (image.width - bound.right > 3) {
    // I generously gave it 3 pixels of potential error (it is needed)
    displacementX = Math.min(350 - Math.floor(normW / 2), canvas.width - normW);
  } else {
    displacementX = canvas.width - normW;
  }
  let displacementY;
  if (image.height - bound.bottom > 3) {
    displacementY = Math.min(
      370 - Math.floor(normH / 2),
      canvas.height - normH
    );
  } else {
    displacementY = canvas.height - normH;
  }

  context.drawImage(cropped, displacementX, displacementY, normW, normH);
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

    try {
      const [image, caption] = await m2iat(message, text);
      if (image) {
        const greenscreened = await greenscreen.greenscreen(image);
        await draw(greenscreened, canvas, context);
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
    message.channel
      .send({ files: [attachment] })
      .then(() => waitupMsg.delete());
  },
};
