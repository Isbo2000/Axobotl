module.exports = {
    commands: ['kick'],
    expectedArgs: ['<user> <reason>'],
    minArgs: [1],
    maxArgs: [2],
    callback: (message, arguments, text) => {
        //run command
        if(!message.mentions.members.first()) {
            message.reply('Please specify a user')
            return
        }

        const target = message.mentions.members.first()

        if (!target.kickable) {
            message.reply('You are not able to kick this user')
            return
        }

        arguments.shift()
        if (arguments[0]) {
            var reason = arguments.join(' ')
        } else {
            var reason = "No reason specified"
        }
        //const reason = arguments.join(' ')

        target.kick(reason)

        message.channel.send(`<@${target.id}> has been kicked for: ${reason}`)

    },
    permissions: ['KICK_MEMBERS'],
}