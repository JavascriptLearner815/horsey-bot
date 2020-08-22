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
                return message.channel.send(helpEmbed, { split: true });
            } catch (err) {
                console.error('Could not send help embed!\n', err);
                message.channel.send('Oh no! I couldn\'t send my embed!');
            }
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        
        data.push(`**Name:** ${command.name}`);
        
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
        
        message.channel.send(data, { split: true });
    },
};
