module.exports = {
    commands: ['habr', 'brr'],
    expectedArgs: ['<word>'],
    minArgs: [1],
    maxArgs: [1],
    callback: (message, arguments, text) => {
        //run command
        message.channel.send("HAHA " + text + " go BRRRRRRRRRRRRRRRRRR")
    },
}