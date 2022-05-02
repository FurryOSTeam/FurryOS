const _ = require('lodash');

module.exports = {
    name: 'help',
    description: 'Bruh ok this shows commands why did you even need to check lol.',
  	aliases: ['help', 'h'],
  	usage: '[command name]',
	  category: 'Info',
async execute(client, message, args, Discord){
        let embed = new Discord.MessageEmbed();

        let commandQuery = args[0];
        if(commandQuery) {
            let command = client.commandList.find(c => c.name.toLowerCase() === commandQuery.toLowerCase() || c.aliases.map(a => a.toLowerCase()).includes(commandQuery.toLowerCase()));
            if(command) {
                embed.setTitle(`${command.name} - Command Info`);
                embed.setDescription(command.description);
                if(command.aliases.length !== 0) embed.addField('Aliases', command.aliases.join(', '), true);
                embed.addField('Usage', `\`${client.config.prefix}${command.name}${command.usage ? ` ${command.usage}` : ''}\``, true);
                embed.addField('Category', command.category, true);
                embed.setColor(client.config.colors.info);
                embed.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() });
                return message.channel.send({ embeds: [embed] });
            }
        }

        let categories = _.groupBy(client.commandList, c => c.category);
        for (const categoryName of Object.keys(categories)) {
            let category = categories[categoryName];
            let commandString = category.map(c => `\`${client.config.prefix}${c.name}${c.usage ? ` ${c.usage}` : ''}\` - ${c.description}`).join('\n');
            embed.addField(`${categoryName}`, `${commandString}`);
        }
        embed.setDescription('Here is a list of the bot commands:');
        embed.setColor(client.config.colors.info);
        embed.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() });
        return message.channel.send({ embeds: [embed] });
    }
}