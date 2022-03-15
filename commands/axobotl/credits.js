const config = require("../../assets/data/config.json");
const Discord = require('discord.js');

module.exports = {
    commands: ['credits','credit','creds','cred'],
    callback: async (message, arguments, text, client) => {
        //run command

        const user1 = await client.users.fetch(config.credid1)
        const user2 = await client.users.fetch(config.credid2)
        const user3 = await client.users.fetch(config.credid3)

        cred1 = [
            ("<@"+user1.id+">|`"+user1.tag+"`|\n"),
            ("Maker and father of Axobotl\n"),
            ("DM me with any questions or suggestions")
        ]
        cred1 = cred1.join(',')
        cred1 = cred1.replace(/[,]/g, function($1) { return $1 === ',' ? '' : ',' })

        cred2 = [
            ("<@"+user2.id+">|`"+user2.tag+"`|\n"),
            ("Inspired me to make the bot\n"),
            ("And helped to make it")
        ]
        cred2 = cred2.join(',')
        cred2 = cred2.replace(/[,]/g, function($1) { return $1 === ',' ? '' : ',' })
        
        cred3 = [
            ("<@"+user3.id+">|`"+user3.tag+"`|\n"),
            ("Provided the image of the tv\n"),
            ("And inspired that feature\n"),
            ("\u200B\n")
        ]
        cred3 = cred3.join(',')
        cred3 = cred3.replace(/[,]/g, function($1) { return $1 === ',' ? '' : ',' })
        
        const embed = new Discord.MessageEmbed()
            .setColor('#00a4ff')
            .setTitle('**Credits**')
            .setDescription("`" + config.prefix + "` (is the bot's prefix)")
            .addFields(
                { name: '\u200B', value: cred1},
                { name: '\u200B\n', value: cred2},
                { name: '\u200B\n', value: cred3}
            )
            .setFooter("Axobotl   |   Version: "+config.version)
        message.channel.send({embeds: [embed] })
    },
}