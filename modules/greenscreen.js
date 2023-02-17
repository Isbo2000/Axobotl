const Canvas = require("canvas");

function imageToDataURL(image) {
  const canvas = Canvas.createCanvas(image.width, image.height);
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

function crop(c) {
  // code yoinked hehe
  // MIT http://rem.mit-license.org
  // (modified)
  // (do not remove this notice when editing it)
  var ctx = c.getContext("2d"),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null,
    },
    x,
    y;

  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] > 10) {
      x = (i / 4) % c.width;
      y = ~~(i / 4 / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  // Calculate the height and width of the content
  var trimHeight = bound.bottom - bound.top,
    trimWidth = bound.right - bound.left,
    trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy = Canvas.createCanvas(trimWidth, trimHeight).getContext("2d");
  copy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return [copy.canvas, bound];
}

module.exports = {
  greenscreen: async function (image) {
    const response = await fetch(
      "https://bgremover.zyro.com/v1/ai/background-remover",
      {
        method: "post",
        body: JSON.stringify({ image_data: imageToDataURL(image) }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return await Canvas.loadImage(data["result"]);
  },
  crop: function (image) {
    const canvas = Canvas.createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return crop(canvas);
  },
};
