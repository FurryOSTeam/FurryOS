const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "kick",
    usage: "/kick <user> <reason>",
    category: "Moderation",
    description: "Kicks a person from the server.",
    ownerOnly: false,
    options: [
      {
          name: "user-to-kick",
          description: "Specifies a user to kick.",
          type: 'USER',
          required: true
      },
      {
          name: "reason",
          description: "Reason for the kick.",
          type: 'STRING',
          required: true
      }
  ],
    run: async (client, interaction) => {
    if(!interaction.member.permissions.has('KICK_MEMBERS')) {
      await interaction.reply({ content: "You do not have permission to kick someone! You need to have kick members on your role!", ephemeral: true });
    } else {
        const kicker = interaction.user.tag;
        let kicked = interaction.options.getUser("user-to-kick");
        let reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(kicked.id) || await interaction.guild.members.fetch(kicked.id).catch(err => {})
      
        if(kicked){
          if(!member.kickable || member.user.id === client.user.id) return interaction.reply({ content: "That user is not kickable.", ephemeral: true });
          
          await member.user.send(`You were kicked from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
          await member.kick({ reason })

          const embed = new MessageEmbed()
            .setColor(client.config.embedcolors.success)
            .setTitle(`Member kicked by ${kicker}`)
            .addField('Kicked Member', `${kicked}`, true)
            .addField('Server', `${interaction.guild.name}`, true)
            .setDescription(`**Reason:** ${reason}`)
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
            
          await interaction.reply({ embeds: [embed] });
        } else{
          await interaction.reply({ content: "Member not found.", ephemeral: true });
      }
    }
  }
}