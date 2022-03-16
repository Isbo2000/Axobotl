let mapping = require("../../assets/updown.json");
for (i in mapping) {
	mapping[mapping[i]] = i;
};

module.exports = {
  commands: ["updown", "upsidedown"],
  expectedArgs: ["<text>"],
  minArgs: [1],
  callback: (message, arguments, text) => {
    //run command
    hi = text;
    text = hi;
    let Rarray = text.split("");
    let reverseArray = Rarray.reverse();
    let result = (reverseArray.map(character => mapping[character] ? mapping[character] : character)).join("");
    message.channel.send(result);
  },
};
