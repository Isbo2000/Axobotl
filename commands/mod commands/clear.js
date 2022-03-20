module.exports = {
  commands: ["clear", "clearmessages", "clearmsg"],
  expectedArgs: ["<number of messages>"],
  minArgs: [1],
  maxArgs: [1],
  callback: async (message, arguments, text) => {
    //run command
    
    num = parseInt(text)
    
    if (!isNaN(num)) {
      Math.abs(num)
      if (num > 0 && num < 101) {
        await message.delete()
        await message.channel.bulkDelete(num).catch((error) => {
          if (error.code == !10008) {
            message.reply(
              "Cannot clear, as there are messages older than 2 weeks"
            );
          }
        });
        await message.reply(num+" messages successfully deleted")
      } else {
        message.reply("Please specify a valid number of messages");
      }
    } else {
      message.reply("Please specify a valid number of messages");
    }
  },
  permissions: ["MANAGE_MESSAGES"],
};
