module.exports = {
  commands: ["ban"],
  expectedArgs: ["<user> <reason>"],
  minArgs: [1],
  maxArgs: [2],
  callback: (message, args, text) => {
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

    args.shift();
    let reason:string;
    if (args[0]) {
      reason = args.join(" ");
    } else {
      reason = "No reason specified";
    }

    target.ban({
      reason,
      days: 0,
    });

    message.channel.send(`<@${target.id}> has been banned for: ${reason}`);
  },
  permissions: ["BAN_MEMBERS"],
};
