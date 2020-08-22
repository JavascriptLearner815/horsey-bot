module.exports = {
    name: 'kick',
    description: 'Kick a member of the server.',
    args: true,
    usage: '<user> <reason>',
    guildOnly: true,
    cooldown: 3,
    aliases: ['remove'],
    execute(message, args) {
        const member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
            return message.channel.send('You don\'t have the permissions to kick, I\'m not a dumb horsey!');
        }

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('I can\'t kick members.');
        }

        if (member.user.id === message.author.id) {
            return message.channel.send('You can\'t kick yourself smfh, just leave the server.');
        }

        if (member.user.bot) {
            return message.channel.send('Bots are so nice and fun, why would you kick one? Poor bot.');
        }

        if (member.user.id === message.guild.ownerID) {
            return message.channel.send('You can\'t kick the owner.');
        }

        if (member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('You can\'t kick a moderator.');
        }

        if (!reason) {
            reason = 'Unspecified';
        }

        member.kick(reason);

        try {
            member.user.send(`You were kicked from ${message.guild.name} by ${message.author} for ${reason}.`);
        } catch (err) {
            console.error('Couldn\'t DM kick message', err);
            message.channel.send(`${member.user} kicked for ${reason}.`);
        } finally {
            message.channel.send('Kick successful!');
        }
    },
};
