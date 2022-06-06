const Canvas = require("canvas");

module.exports = async function (message, text) {
  let image;

  let member = message.mentions.users.first();
  let memberrep = message.mentions.users.first(2)[1];
  if (message.type == "REPLY") {
    const msg = await message.channel.messages.fetch(
      message.reference.messageId
    );

    if (msg.attachments?.size == 1) {
      var link = msg.attachments?.first().url;
      image = await Canvas.loadImage(link);

      if (memberrep) {
        text = text.replace(memberrep, "");
        if (text == "") {
          text = memberrep.username;
        }
      }
    }
  } else if (message.attachments?.size == 1) {
    var link = message.attachments.first()?.url;
    image = await Canvas.loadImage(link);

    if (member) {
      text = text.replace(member, "");
      if (text == "") {
        text = member.username;
      }
    }
  } else if (member) {
    if (member.avatar) {
      image = await Canvas.loadImage(
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
    }
  }

  return [image, text];
};
