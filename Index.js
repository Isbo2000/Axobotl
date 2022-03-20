console.log("|\nInitializing...\n|");

const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const readline = require("readline-sync");
const config = require("./assets/data/config.json");

const client = new Discord.Client({
  intents: [
    "GUILD_MESSAGES",
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_VOICE_STATES",
  ],
});
client.setMaxListeners(0);

async function asktoken() {
  ans = readline.question(
    "Please enter your token (it is only stored locally): ",
    {
      hideEchoBack: true,
    }
  );
  console.log("|");
  answer = '{"token": "' + ans + '"}';
  fs.writeFileSync("./assets/data/token.json", answer);
  try {
    await client.login(ans);
  } catch (err) {
    fs.unlinkSync("./assets/data/token.json");
    console.error(err);
    return;
  }
}
console.log("Checking for token...\n|");
async function checktoken() {
  if (fs.existsSync("./assets/data/token.json")) {
    const token = require("./assets/data/token.json");
    try {
      await client.login(token.token);
      console.log("Token found!\n|");
    } catch (err) {
      asktoken();
    }
  } else {
    asktoken();
  }
}
checktoken();

client.on("ready", async () => {
  client.user.setActivity("you | " + config.prefix + "help", {
    type: "WATCHING",
  });

  const baseFile = "command-base.js";
  const commandBase = require(`./commands/${baseFile}`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        commandBase(client, option);
      }
    }
  };

  readCommands("commands");

  console.log(
    `|\n|\nLogged in ${client.user.tag}\n|\n|\nPress 'ctr+c' to quit\n|\n|\nLogs:\n`
  );
});
