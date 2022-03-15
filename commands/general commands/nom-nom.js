module.exports = {
    commands: ['nom', 'eat', 'nomnom'],
    expectedArgs: ['<user/thing>'],
    minArgs: [1],
    maxArgs: [1],
    callback: (message, arguments, text) => {
        //run command
        user = message.author.id
        rando = Math.floor(Math.random() * 4);

        if (rando == 0) {
            message.channel.send({content: `<@${user}> nommed on ${text}`, files: ['./assets/nomnom/nom.gif']})
        }

        if (rando == 1) {
            message.channel.send({content: `<@${user}> nommed on ${text}`, files: ['./assets/nomnom/nom2.gif']})
        }

        if (rando == 2) {
            message.channel.send({content: `<@${user}> nommed on ${text}`, files: ['./assets/nomnom/nom3.gif']})
        }

        if (rando == 3) {
            message.channel.send({content: `<@${user}> nommed on ${text}`, files: ['./assets/nomnom/nom4.gif']})
        }
    },
}