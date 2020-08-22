const { clientID } = require('../config.json');

module.exports = {
    name: 'is-bot',
    description: 'Check if someone is a bot.',
    args: true,
    usage: '<user>',
    guildOnly: true,
    cooldown: 15,
    aliases: ['bot', 'check-bot'],
    execute(message, args) {
        const user = message.mentions.users.first();

        if (user.bot) {
            if (user.id === clientID) {
                return message.reply('false, I\'m secretly a horsey god!!!');
            } else {
                return message.reply('true.');
            }
        } else if (user.id === '339308628945141761') {
            return message.reply('true?');
        } else {
            return message.reply('false.');
        }
    },
};
