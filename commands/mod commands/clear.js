module.exports = {
    commands: ['clear', 'clearmessages', 'clearmsg'],
    minArgs: [0],
    maxArgs: [0],
    callback: (message, arguments, text) => {
        //run command
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results).catch(error => {
                if (error.code !== 10008) {
                    message.reply('Cannot clear, as there are messages older than 2 weeks')
                }
            })
        })
    },
    permissions: ['MANAGE_MESSAGES'],
}