const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	description: 'Get a random cat image from a JSON GET request.',
	args: false,
	usage: false,
	guildOnly: false,
	cooldown: 10,
	cooldownMessage: 'Aww, slow down cat lover',
	aliases: ['kitty', 'kitten'],
	async execute(message, args) {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		message.channel.send(file);
	},
};
