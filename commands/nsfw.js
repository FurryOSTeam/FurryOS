const _ = require('lodash');

module.exports = {
    name: 'nsfw',
    description: 'Shows a list of NSFW commands.',
  	aliases: ['nsfw', 'NSFW'],
  	usage: '[command name]',
	  category: 'Furry Images',
async execute(client, message, args, Discord){
  if (message.channel.nsfw) {
        let embed = new Discord.MessageEmbed();

        let commandQuery = args[0];
        if(commandQuery) {
            let command = client.commandListNSFW.find(c => c.name.toLowerCase() === commandQuery.toLowerCase() || c.aliases.map(a => a.toLowerCase()).includes(commandQuery.toLowerCase()));
            if(command) {
                embed.setTitle(`${command.name} - Command Info`);
                embed.setDescription(command.description);
                if(command.aliases.length !== 0) embed.addField('Aliases', command.aliases.join(', '), true);
                embed.addField('Usage', `\`${client.config.prefix}${command.name}${command.usage ? ` ${command.config.usage}` : ''}\``, true);
                embed.addField('Category', command.category, true);
                embed.setColor(client.config.colors.info);
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
                return message.channel.send(embed);
            }
        }

        let categories = _.groupBy(client.commandListNSFW, c => c.category);
        for (const categoryName of Object.keys(categories)) {
            let category = categories[categoryName];
            let commandString = category.map(c => `\`${client.config.prefix}${c.name}${c.usage ? ` ${c.usage}` : ''}\` - ${c.description}`).join('\n');
            embed.addField(`${categoryName}`, `${commandString}`);
        }
        embed.setDescription('Here is a list of the NSFW commands:');
        embed.setColor(client.config.colors.info);
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        return message.channel.send(embed);

        } else {
        message.channel.send("This channel is SFW. Make it NSFW to see NSFW commands.");
     }
  }
}