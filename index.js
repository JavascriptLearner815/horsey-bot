const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix, token, clientID, clientSecret } = require('./config.json');

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) return;
    message.channel.send('You sent a message. I also checked to see if you\'re a bot or I would loop forever.');
});

client.login(token);
