const express = require("express");
const app = express();
const Discord = require('discord.js');
const handler = require("./handlers/index");
const client = new Discord.Client({
    //messageCacheLifetime: 60,
    //fetchAllMembers: false,
    //messageCacheMaxSize: 10,
    //restTimeOffset: 0,
    //restWsBridgetimeout: 100,
    shards: "auto",
    //allowedMentions: {
    //  parse: [ ],
    //  repliedUser: false,
    //},
    //partials: ["GUILD_MEMBER", "MESSAGE", "USER", "CHANNEL"],
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        //Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        //Discord.Intents.FLAGS.DIRECT_MESSAGES,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});

module.exports = client;

client.discord = Discord;
client.slash = new Discord.Collection();
client.config = require('./config')

handler.loadEvents(client);
handler.loadSlashCommands(client);

//process.on("uncaughtException", (err) => {
//    console.log("Uncaught Exception: " + err);
//});
  
//process.on("unhandledRejection", (reason, promise) => {
//    console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
//});

app.get('/', (request, response) => {
    response.sendStatus(200);
});

const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is currently listening on port: ' + listener.address().port);
});

client.login(process.env.token);