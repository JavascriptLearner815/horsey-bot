module.exports = {
	name: 'clear',
	description: 'Clears an amount of messages from the channel.',
	args: true,
	usage: '<amount>',
	guildOnly: true,
	cooldown: 3,
	aliases: ['prune', 'bulk', 'delete', 'remove'],
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.reply('you don\'t have the permission to manage messages!');
		}

		if (isNaN(amount)) {
			return message.reply('that isn\'t a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you must input a number between 1 and 99.');
		}

		try {
			message.channel.bulkDelete(amount, true);
		} catch (err) {
			console.error(err);
			message.reply('there was an error trying to clear messages in this channel, they\'re probably too old!');
		}
	},
};
