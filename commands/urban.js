const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const urban = require('urban');

module.exports = {
    name: 'urban',
    description: 'Shows a defnition from the urban dictionary.',
  	aliases: ['urban'],
  	usage: '<word>',
	  category: 'Fun',
async execute(client, message, args, Discord){
    if(!args[0]) return message.channel.send('Enter a word to search for.');
      
    const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxeXc6CDMTuda_avVhbE95cPJ2QMoKLxNbHR5pvyUoB0a_y-fl';
  
    let msg = args.slice(0).join(' ');

    let search = urban(msg);
    
    try{
      search.first(result => {
        if(!result) return message.channel.send('No results found bro!');

        let { word, definition, example, thumbs_up, thumbs_down, permalink, author } = result;

        let embed = new MessageEmbed()
          .setColor(16382454)
          .setAuthor({ name: `Urban Dictionary | ${word}`, img })
          .setThumbnail(img)
          .setDescription(stripIndents`**Definition** ${definition || 'No definition'}
          **Example:** ${example || 'No example'}
          **Upvote:** ${thumbs_up || 0}
          **Downvote:** ${thumbs_down || 0}
          **Link:** [link to ${word}](${permalink || 'https://www.urbandictionary.com/'})`)
          .setTimestamp()
          .setFooter({ text: `Written by ${author || 'Unknown'}` });
        
        message.channel.send({ embeds: [embed] });
      });
    } catch(e){
      console.log(e);
      return message.channel.send('Error. Try again!');
    }
  }
}