const fetch = require('node-fetch');

module.exports = {
	name: 'dog',
	description: 'Get a random dog from the REST API. Fetch! Haha.',
	args: false,
	usage: false,
	guildOnly: false,
	cooldown: 10,
	cooldownMessage: 'Aww, slow down dog lover',
	aliases: ['fetch', 'puppy', 'puppie', 'doggo', 'pupper', 'doggie', 'bark', 'ruff', 'howl', 'growl', 'yip'],
	async execute(message, args) {
		const dog = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());

		message.channel.send(dog.message);
	},
};
