module.exports = {
  commands: ["ban"],
  expectedArgs: ["<user> <reason>"],
  minArgs: [1],
  maxArgs: [2],
  callback: async (message, arguments, text) => {
    //run command
    if (!message.mentions.members.first()) {
      message.reply("Please specify a user");
      return;
    }

    const target = message.mentions.members.first();

    if (!target.bannable) {
      message.reply("You are not able to ban this user");
      return;
    }

    arguments.shift();
    if (arguments[0]) {
      var reason = arguments.join(" ");
    } else {
      var reason = "No reason specified";
    }
    //const reason = arguments.join(' ')

    target.ban({
      reason,
      days: 0,
    });

    message.channel.send(`<@${target.id}> has been banned for: ${reason}`);
  },
  permissions: ["BAN_MEMBERS"],
};
