import mapping from "../../assets/updown.json";
for (let i in mapping) {
  mapping[mapping[i]] = i;
}

export const commands = ["updown", "upsidedown"];
export const expectedArgs = ["<text>"];
export const minArgs = [1];
export const callback = (message, args, text) => {
  //run command
  let Rarray = text.split("");
  let reverseArray = Rarray.reverse();
  let result = reverseArray
    .map((character) => (mapping[character] ? mapping[character] : character))
    .join("");
  result = result.replaceAll("@everyone", "@еveryone"); // The first "e" here is a cyryllic letter; this prevents actually mentioning anyone
  result = result.replaceAll("@here", "@hеre"); // Same here. They look identical but actually aren't
  result = result.replaceAll("<@", "<\u200B@"); // To prevent mentioning unmentionable roles if the bot has admin
  message.channel.send(result);
};
