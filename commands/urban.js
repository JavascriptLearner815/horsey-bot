const fetch = require('node-fetch');
const querystring = require('querystring');
const { MessageEmbed } = require('discord.js');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	name: 'urban',
	description: 'Search for something in the urban dictionary.',
	args: true,
	usage: '<term>',
	guildOnly: false,
	cooldown: 10,
	cooldownMessage: 'Go read a book',
	aliases: ['urban-dictionary', 'urban-dic'],
	async execute(message, args) {
		if (!message.channel.nsfw) {
			return message.reply('don\'t try to get sex stories in non-NSFW channels.');
		}

		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) {
			return message.channel.send(`Sorry, I couldn't find anything for **${args.join(' ')}**.`);
		}

		const [answer] = list;

		const embed = new MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
			);

		message.channel.send(embed);
	},
};
