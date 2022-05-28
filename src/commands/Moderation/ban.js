const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",
    usage: "/ban <user> <reason>",
    category: "Moderation",
    description: "Bans a person from the server.",
    ownerOnly: false,
    options: [
      {
          name: "user-to-ban",
          description: "Specifies a user to ban.",
          type: 'USER',
          required: true
      },
      {
          name: "reason",
          description: "Reason for the ban.",
          type: 'STRING',
          required: true
      }
  ],
    run: async (client, interaction) => {
    if(!interaction.member.permissions.has('BAN_MEMBERS')) {
      await interaction.reply({ content: "You do not have permission to ban someone! You need ban members on your role!", ephemeral: true });
    } else {
        const banner = interaction.user.tag;
        let banned = interaction.options.getUser("user-to-ban");
        let reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(banned.id) || await interaction.guild.members.fetch(banned.id).catch(err => {})
      
        if(banned){
          if(!member.bannable || member.user.id === client.user.id) return interaction.reply({ content: "That user is not bannable.", ephemeral: true });
          
          await member.user.send(`You are banned from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
          await member.ban({ reason })

          const embed = new MessageEmbed()
            .setColor(client.config.embedcolors.success)
            .setTitle(`Member banned by ${banner}`)
            .addField('Banned Member', `${banned}`, true)
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