module.exports = {
  commands: ["kick"],
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

    if (!target.kickable) {
      message.reply("You are not able to kick this user");
      return;
    }

    args.shift();
    let reason:string;
    if (args[0]) {
      reason = args.join(" ");
    } else {
      reason = "No reason specified";
    }

    target.kick(reason);

    message.channel.send(`<@${target.id}> has been kicked for: ${reason}`);
  },
  permissions: ["KICK_MEMBERS"],
};
