import assets from "../../assets/nomnom/index.json";

export const commands = ["nom", "eat", "nomnom"];
export const expectedArgs = ["<user/thing>"];
export const minArgs = [1];
export const maxArgs = [1];
export const callback = (message, args, text) => {
  //run command
  const user = message.author.id;
  console.log(text);
  const rando = Math.floor(Math.random() * assets.length);

  let result = text;
  result = result.replaceAll("@everyone", "@еveryone"); // The first "e" here is a cyryllic letter; this prevents actually mentioning anyone
  result = result.replaceAll("@here", "@hеre"); // Same here. They look identical but actually aren't
  if (message.mentions.roles.size) {
    // if at least one role was mentioned, we're going to bleck everything
    result = result.replaceAll("<@", "<\u200B@"); // To prevent mentioning unmentionable roles if the bot has admin
  }
  result = `<@${user}> nommed on ${result}`;

  message.channel.send({
    content: result,
    files: [assets[rando]],
  });
};
