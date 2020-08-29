module.exports = {
    name: 'server',
    description: 'Display basic server information.',
    args: false,
    usage: false,
    guildOnly: true,
    cooldown: 10,
    aliases: ['guild', 'server-info', 'guild-info'],
    execute(message, args) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated: ${message.guild.createdAt}\nLocation: ${message.guild.region}\nAcronym: ${message.guild.nameAcronym}`);
    },
};
