const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix, token, clientID, clientSecret } = require('./config.json');

client.once('ready', () => {
    console.log('Ready!');
});

client.login(token);
