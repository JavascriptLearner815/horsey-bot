module.exports = {
    name: 'stats',
    description: 'My horsey bot stats. See how much I\'ve grown!',
    args: false,
    usage: false,
    guildOnly: false,
    cooldown: 15,
    aliases: ['horsey'],
    execute(message, args) {
        message.channel.send(`Servers: ${client.guilds.cache.size}`);
    },
};
