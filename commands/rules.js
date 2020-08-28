module.exports = {
	name: 'rules',
	description: 'Displays a rule disclaimer.',
	args: false,
	usage: false,
	guildOnly: false,
	cooldown: 15,
	aliases: ['guidelines', 'disclaimer'],
	execute(message, args) {
		message.channel.send('The rules can be found at <https://github.com/JavascriptLearner815/horsey-bot>. By participating in a server with this bot you accept any rules in that repository.');
	},
};
