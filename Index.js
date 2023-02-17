console.log("|\nInitializing...\n|");

const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const readline = require("readline-sync");
const config = require("./assets/data/config.json");
const embed_gen = require("./assets/data/embed.js");
const asset = require("./assets/help/help.json");

const client = new Discord.Client({
  intents: [
    "GUILD_MESSAGES",
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_VOICE_STATES",
    "DIRECT_MESSAGES",
  ],
  partials: ["CHANNEL"],
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
console.log("|\nChecking for token...");
async function checktoken() {
  if (fs.existsSync("./assets/data/token.json")) {
    const token = require("./assets/data/token.json");
    try {
      await client.login(token.token);
      console.log("|\nToken found!");
    } catch (err) {
      asktoken();
    }
  } else {
    asktoken();
  }
}
checktoken();

client.on("ready", async () => {
  console.log(`|\nLogged in ${client.user.tag}`);
  client.user.setActivity(config.activity[1] + config.prefix + "help", {
    type: config.activity[0],
  });
  console.log(
    `|\nStatus set to: ${config.activity[0]} ${config.activity[1]}${config.prefix}help\n|\n|`
  );

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

  console.log(`|\n|\nPress 'ctr+c' to quit\n|\n|\nLogs:\n`);

  //const guilds = client.guilds.cache.map(guild => guild);
  //guilds.forEach(async guild => {
  //    const owner = await guild.fetchOwner();
  //    console.log(`Guild Name: ${guild.name}\n Owner: ${owner.user.tag}\n  Total Members: ${guild.memberCount}\n\n`)
  //});
});

client.on("presenceUpdate", async () => {
  client.user.setActivity(config.activity[1] + config.prefix + "help", {
    type: config.activity[0],
  });
  console.log(
    `Status reset to: ${config.activity[0]} ${config.activity[1]}${config.prefix}help`
  );
});
