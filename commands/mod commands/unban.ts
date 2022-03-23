export const commands = ["unban"];
export const expectedArgs = ["<userID>"];
export const minArgs = [1];
export const maxArgs = [1];
export const callback = (message, args, text) => {
  //run command
  let userID = args[0];
  message.guild.bans.fetch().then((bans) => {
    if (bans.size == 0) return message.reply("There is no banned users");
    let bUser = bans.find((b) => b.user.id == userID);
    if (!bUser) return message.reply("This user is not currently banned");
    message.guild.members.unban(bUser.user);
  });
  message.channel.send(`<@${userID}> has been unbanned`);
};
export const permissions = ["BAN_MEMBERS"];