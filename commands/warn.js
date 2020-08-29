module.exports = {
	name: 'warn',
	description: 'Warn a user for something.',
	args: true,
	usage: '<user> [reason]',
	guildOnly: true,
	cooldown: 3,
	aliases: ['warning'],
	execute(message, args) {
		const user = message.mentions.users.first();
		let reason = args.slice(1).join(' ');

		if (message.guild.member(user).hasPermission('KICK_MEMBERS')) {
			return message.reply('you can\'t warn a moderator.');
		}

		if (!message.member.hasPermission('KICK_MEMBERS')) {
			return message.reply('you don\'t have permission to do that!');
		}

		if (!user) {
			return message.reply('please specify a single user!');
		}

		if (!reason) {
			reason = 'Unspecified';
		}

		message.channel.send(`${user}, you were warned for ${reason}.`);

		try {
			user.send(`Hey ${user}, you were warned in ${message.guild.name} for ${reason}.`);
		} catch (error) {
			console.error('Could not send warn DM:', error);
			message.channel.send('I couldn\'t DM that user that they were warned. They are informed when they look at this channel.');
		}
	},
};
