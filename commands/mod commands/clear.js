module.exports = {
  commands: ["clear", "clearmessages", "clearmsg"],
  expectedArgs: ["<number of messages>"],
  minArgs: [1],
  maxArgs: [1],
  callback: (message, arguments, text) => {
    //run command
    
    num = parseInt(text)

    message.delete()
    if (num > 0 && num < 101) {
      message.channel.bulkDelete(text).catch((error) => {
        if (error.code == 10008) {
          message.reply(
            "Cannot clear, as there are messages older than 2 weeks"
          );
        }
        message.channel.send(text+" messages successfully deleted")
      });
    } else {
      message.reply("Please specify a valid number of messages");
    }
  },
  permissions: ["MANAGE_MESSAGES"],
};
