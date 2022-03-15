console.log("|\nInitializing...\n|")

const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')

const client = new Discord.Client({ intents: ["GUILD_MESSAGES", "GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_VOICE_STATES"] });
client.setMaxListeners(0);

const config = require('./assets/data/config.json')

client.on('ready', async () => {

    client.user.setActivity('you | ' + config.prefix +'help', { type: "WATCHING" })

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')

    console.log(`|\n|\nLogged in ${client.user.tag}\n|\n|\nPress 'ctr+c' to quit\n|\n|\nLogs:\n`)
})

client.login(config.token)
