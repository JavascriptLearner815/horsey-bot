const fs = require('fs');

const { prefix, token, clientID, clientSecret } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

const cooldowns = new Discord.Collection();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setActivity(`${prefix}help`, { type: 'PLAYING' });
    console.log('Ready!');
});

client.on('message', message => {
    if (message.webhookID) return;

    if (message.author.bot) return;

    if (message.content === 'horsey') {
        message.react('742826710453452911');
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (commandName === 'stats' || commandName === 'horsey') {
        return message.channel.send(`Servers: ${client.guilds.cache.size}`);
    }

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('That command is not supported in DMs.');
    }

    if (!message.guild.me.hasPermission('VIEW_CHANNEL') || !message.guild.me.hasPermission('SEND_MESSAGES')) {
        return console.log(`I can't send messages in ${message.guild.name}!`);
    }

    if (command.args && !args.length) {
        let reply = `Horsey ${message.author}, you need to provide some arguments!`;

        if (command.usage) {
            reply += `\nTo use this command like a horsey master, use it like this: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;

            let response = `Command on cooldown! ${timeLeft.toFixed(1)} second(s)`;

            if (command.cooldownMessage) {
                response = `${command.cooldownMessage}, you must wait ${timeLeft.toFixed(1)} more second(s)!`;
            }

            return message.channel.send(response);
        }
    }

    timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error('400 - Bad Request\n', error);
        message.reply('HORSEY? 400 - Bad Request');
    }
});

client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});



client.login(token);
