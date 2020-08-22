const { prefix } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all horsey commands or get the most horsey info about a specific one.',
    args: false,
    usage: '<command name>',
    guildOnly: true,
    cooldown: 5,
    aliases: ['commands'],
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            const title = 'Horsey! List of all commands:';
            data.push(commands.map(command => command.name).join(', '));
            const footer = `\nHorseys, use \`${prefix}help <command name>\` to get info on a specific command!`;

            const helpEmbed = new MessageEmbed()
                .setTitle(title)
                .setAuthor(message.author.username)
                .setDescription(data)
                .addField('User', message.author.username)
                .setTimestamp()
                .setFooter(footer);

            try {
                return message.channel.send(helpEmbed);
            } catch (err) {
                console.error('Could not send help embed!\n', err);
                message.channel.send('Oh no! I couldn\'t send my embed!');
            }
        }
    },
};
