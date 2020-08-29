const ytdl = require('ytdl-core-discord');

module.exports = {
	name: 'play',
	description: 'Play audio from YouTube',
	args: true,
	usage: '<url>',
	guildOnly: true,
	cooldown: 3,
	cooldownMessage: 'I know you like jammin\' but',
	aliases: ['audio'],
	async execute(message, args) {
		try {
			if (!message.member.voice.channel) {
				return message.reply('please join a voice channel first!');
			}

			const url = args[0];

			const connection = await message.member.voice.channel.join();

			const dispatcher = connection.play(await ytdl(url), { type: 'opus' });

			dispatcher.on('start', () => {
				message.channel.send(`Now Playing: ${url}`);
			});

			dispatcher.on('finish', () => {
				message.channel.send(`Finished Playing ${url}!`);
			});

			dispatcher.on('error', error => {
				console.error(error);
				connection.disconnect();
				message.reply('an error occurred!');
			});
		} catch (error) {
			console.error(error);
			connection.disconnect();
			message.reply('an error occurred!');
		}
	},
};
