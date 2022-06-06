module.exports = {
  commands: ["unban"],
  expectedArgs: ["<userID>"],
  minArgs: [1],
  maxArgs: [1],
  callback: async (message, arguments, text) => {
    //run command
    let userID = arguments[0];
    message.guild.bans.fetch().then((bans) => {
      if (bans.size == 0) return message.reply("There is no banned users");
      let bUser = bans.find((b) => b.user.id == userID);
      if (!bUser) return message.reply("This user is not currently banned");
      message.guild.members.unban(bUser.user);
    });
    message.channel.send(`<@${userID}> has been unbanned`);
  },
  permissions: ["BAN_MEMBERS"],
};
