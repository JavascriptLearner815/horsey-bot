module.exports = {
	name: 'random',
	description: 'Generate a random number between some amounts, if any.',
	args: false,
	usage: '[min] [max]',
	guildOnly: false,
	cooldown: 3,
	aliases: ['number', 'num', 'rand', 'int', 'integer'],
	execute(message, args) {
		function getRandomIntInclusive(min, max) {
  			min = Math.ceil(min);
  			max = Math.floor(max);
  			return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive 
		}

		let min = args[0];
		let max = args[1];

		if (!min) min = 0;
		if (!max) max = 1;

		if (typeof min !== 'number' || typeof max !== 'number') {
			return message.reply('you need to specify a *number*.');
		} 

		const result = getRandomIntInclusive(min, max);

		if (!result && result !== 0) {
			return message.reply('I couldn\'t get the result!');
		}

		message.reply(`your random number is: ${result}`);
	},
};
