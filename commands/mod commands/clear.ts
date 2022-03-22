export const commands = ["clear", "clearmessages", "clearmsg"];
export const expectedArgs = ["<number of messages>"];
export const minArgs = [1];
export const maxArgs = [1];
export const callback = (message, args, text) => {
  //run command
  
  const num = parseInt(text)
  
  if (!isNaN(num)) {
    Math.abs(num)
    if (num > 0 && num < 101) {
      message.delete()
      message.channel.bulkDelete(num).catch((error) => {
        if (error.code !== 10008) {
          message.channel.send(
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
};
export const permissions = ["MANAGE_MESSAGES"];