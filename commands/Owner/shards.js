const ownerid = require('../../utils/config.json')

module.exports = {
    name: 'shards',
    description: 'Shows sharding stuff.',
  	aliases: ['shards'],
  	usage: '',
	  category: 'Owner',
async execute(client, message, args, Discord){
    if (!ownerid.Owner.includes(message.author.id)) {
      return message.channel.send(`You cannot use this command!`)
   }
  let values = await client.shard.broadcastEval(`
    [
        this.shard.id,
        this.guilds.size
    ]
`);

let finalString = "**SHARD STATUS**\n\n";

values.forEach((value) => {
    finalString += "• SHARD #"+value[0]+" | ServerCount: "+value[1]+"\n";
});

message.channel.send(finalString);
  }
}