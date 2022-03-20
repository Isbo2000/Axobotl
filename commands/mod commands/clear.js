module.exports = {
  commands: ["clear", "clearmessages", "clearmsg"],
  expectedArgs: ["<number of messages>"],
  minArgs: [1],
  maxArgs: [1],
  callback: (message, arguments, text) => {
    //run command

    if (isNaN("|" + text + "|")) {
      text++;
      if (text > 0 && text < 102) {
        message.channel.bulkDelete(text).catch((error) => {
          if (error.code !== 10008) {
            message.reply(
              "Cannot clear, as there are messages older than 2 weeks"
            );
          }
        });
      } else {
        message.reply("Please specify a valid number of messages");
      }
    } else {
      message.reply("Please specify a valid number of messages");
    }
  },
  permissions: ["MANAGE_MESSAGES"],
};
