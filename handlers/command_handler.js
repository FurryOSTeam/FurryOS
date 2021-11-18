const fs = require('fs');

module.exports = (client, Discord) => {
let commandList = [];
let commandListNSFW = [];
client.commandList = commandList;
client.commandListNSFW = commandListNSFW;
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    const ownerCommandFiles = fs.readdirSync('./commands/Owner/').filter(ownerCommandFile => ownerCommandFile.endsWith('.js'));
    const nsfwCommandFiles = fs.readdirSync('./commands/NSFW/').filter(nsfwCommandFile => nsfwCommandFile.endsWith('.js'));
    for(const file of commandFiles){
        const command = require(`../commands/${file}`);
        commandList.push({
            file: command,
            name: file.split('.')[0],
            description: command.description,
            aliases: command.aliases,
            usage: command.usage,
            category: command.category
        });
            client.commands.set(command.name, command)
            if(command.name){
                client.commands.set(command.name, command)
           } else {
           continue;
        }
    }
       for(const ownerCommandFile of ownerCommandFiles){
        const ownerCommand = require(`../commands/Owner/${ownerCommandFile}`);
            client.commands.set(ownerCommand.name, ownerCommand)
            if(ownerCommand.name){
                client.commands.set(ownerCommand.name, ownerCommand)
           } else {
           continue;
        }
    }
        for(const nsfwCommandFile of nsfwCommandFiles){
        const nsfwCommand = require(`../commands/NSFW/${nsfwCommandFile}`);
        commandListNSFW.push({
            file: nsfwCommand,
            name: nsfwCommandFile.split('.')[0],
            description: nsfwCommand.description,
            aliases: nsfwCommand.aliases,
            usage: nsfwCommand.usage,
            category: nsfwCommand.category
        });
            client.commands.set(nsfwCommand.name, nsfwCommand)
            if(nsfwCommand.name){
                client.commands.set(nsfwCommand.name, nsfwCommand)
           } else {
           continue;
        }
    }
}