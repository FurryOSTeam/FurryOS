module.exports = async (Discord, client, message) =>{
    const prefix = client.config.prefix
    
    //console.log(prefix)
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command) command.execute(client, message, args, Discord, cmd);
}

   // if (!ownerid.Owner.includes(message.author.id))