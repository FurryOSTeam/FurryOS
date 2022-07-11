const Discord = require('discord.js');
const fetch = require('axios');

module.exports = {
    name: "sendtoroblox",
    usage: "/sendtoroblox <user>",
    category: "Owner",
    description: "Sends a message to a roblox game.",
    ownerOnly: true,
    options: [
        {
            name: 'message',
            description: 'Message to send.',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
    const mess = interaction.options.getString("message");

    try {
        fetch({
            method: "POST",
            url: "https://apis.roblox.com/messaging-service/v1/universes/1725206480/topics/Announcements",
              headers: {
                   'x-api-key': process.env.thingy,
                   'Content-Type': "application/json"
               },
               data: {
                 message: mess,
               },
             })
        const embed = new Discord.MessageEmbed()
            .setColor(client.config.embedcolors.success)
            .setTitle(`Message.`)
            .addField('Successfully to sent message: ', `${mess}`, true)
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

        await interaction.reply({ embeds: [embed] });
    } catch (err) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.config.embedcolors.error)
            .setTitle(`Message.`)
            .addField('Failed to send message: ', `${mess}`)
            .addField('Error: ', `${err}`)
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

        await interaction.reply({ embeds: [embed] });
    }
  }
}