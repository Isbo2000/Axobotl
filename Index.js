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

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.mentions.has(client.user.id)) {
    if (
      message.content.includes("@here") ||
      message.content.includes("@everyone")
    )
      return;
    console.log(`"${client.user.tag}" has been pinged`);
    prefix = config.prefix;
    commands = asset.commands
      .map(
        (command) => `${command.description}:\n\`${prefix}${command.command}\``
      )
      .join("\n");
    invite_link = `https://discord.com/api/oauth2/authorize?client_id=${config.client}&permissions=${config.permissions}&scope=bot`;
    invite = `Link to invite this bot to your server:\n**[Invite Me!](${invite_link})**`;
    const embed = embed_gen
      .embed()
      .setTitle("**Help Menu**")
      .addFields(
        { name: "\u200B", value: asset.graphic.join("\n") },
        { name: "Help:", value: commands },
        { name: "Invite:", value: invite }
      );
    message.channel.send({ embeds: [embed] });
  } else if (message.channel instanceof Discord.DMChannel) {
    console.log(`"${message.author.username}" sent a DM`);
    message.reply("DM chatbot comming soon!!!");
  }
});
