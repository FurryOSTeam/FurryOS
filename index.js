const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./utils/config.json');

let commandList = [];
let commandListNSFW = [];

client.commandList = commandList;
client.commandListNSFW = commandListNSFW;
client.config = config;
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

app.get('/', (request, response) => {
    response.sendStatus(200);
});

const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is currently listening on port: ' + listener.address().port);
});

['command_handler', 'event_handler'].forEach(handler =>{ 
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.token);