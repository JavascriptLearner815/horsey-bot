module.exports = {
    name: 'ban',
    description: 'Bans a member from the server forever. Go to the bans list and unban them there to unban them.',
    args: true,
    usage: '<user> <reason>',
    guildOnly: true,
    cooldown: 3,
    aliases: ['out-horsey'],
    execute(message, args) {
        const user = message.mentions.users.first();

        if (!user) {
            return message.channel.send('You must only specify a single user!');
        }

        let reason = args.slice(1).join(' ');

        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            return message.channel.send('You don\'t have the permissions to ban, I\'m not a dumb horsey!');
        }

        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('I can\'t ban members.');
        }

        if (user.id === message.author.id) {
            return message.channel.send('You can\'t ban yourself smfh, just leave the server.');
        }

        if (user.bot) {
            return message.channel.send('Bots are so nice and fun, why would you ban one? Poor bot.');
        }

        if (user.id === message.guild.ownerID) {
            return message.channel.send('You can\'t ban the owner.');
        }

        if (message.guild.member(user).hasPermission('KICK_MEMBERS')) {
            return message.channel.send('You can\'t ban a moderator.');
        }

        if (!reason) {
            reason = 'Unspecified';
        }

        message.guild.members.ban(user);

        try {
            member.user.send(`You were banned from ${message.guild.name} by ${message.author} for ${reason}.`);
        } catch (err) {
            console.error('Couldn\'t DM ban message', err);
            message.channel.send(`${member.user} banned for ${reason}.`);
        } finally {
            message.channel.send('Ban successful!');
        }
    },
};
