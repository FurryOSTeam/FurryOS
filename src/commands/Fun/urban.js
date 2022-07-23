const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const urban = require('urban');
const Discord = require('discord.js');

module.exports = {
    name: "urban",
    usage: "/urban <term>",
    category: "Fun",
    description: "Shows a defnition from the urban dictionary.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'term',
            description: 'Term to look up.',
            type: Discord.ApplicationCommandOptionType.String,
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
          .setColor(client.config.embedcolors.default)
          .setAuthor({ name: `Urban Dictionary | ${word}`, img })
          .setThumbnail(img)
          .setDescription(stripIndents`**Definition** ${definition || 'No definition'}
          **Example:** ${example || 'No example'}
          **Upvote:** ${thumbs_up || 0}
          **Downvote:** ${thumbs_down || 0}
          **Link:** [link to ${word}](${permalink || 'https://www.urbandictionary.com/'})`)
          .setTimestamp()
          .setFields({ name: `Written by`, value: `${author || 'Unknown'}` })
          .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
        
        interaction.reply({ embeds: [embed] });
      });
    } catch(e){
      console.log(e);
      return await interaction.reply({ content: 'Error. Try again!', ephemeral: true });
    }
  }
}