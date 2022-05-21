const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const urban = require('urban');

module.exports = {
    name: "urban",
    category: "Fun",
    description: "Shows a defnition from the urban dictionary.",
    ownerOnly: false,
    options: [
        {
            name: 'term',
            description: 'Term to look up.',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
    const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxeXc6CDMTuda_avVhbE95cPJ2QMoKLxNbHR5pvyUoB0a_y-fl';
  
    let msg = interaction.options.getString("term");

    let search = urban(msg);
    
    try{
      search.first(result => {
        if(!result) return interaction.reply({ content: 'No results found bro!', ephemeral: true });

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
        
        interaction.reply({ embeds: [embed] });
      });
    } catch(e){
      console.log(e);
      return await interaction.reply({ content: 'Error. Try again!', ephemeral: true });
    }
  }
}