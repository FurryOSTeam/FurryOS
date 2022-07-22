const Discord = require('discord.js');

const ids = {
            //big                     //qae                  /prod
    id: ["345959027143999490", "502947692046057473", "615225900514017312"]
}

module.exports = {
    name: "2022",
    usage: "/2022 <user>",
    category: "Owner",
    description: "2022s a user.",
    ownerOnly: false,
    options: [
        {
            name: "user",
            description: "2022s a user.",
            type: 'USER',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        try {
            if (ids.id.includes(interaction.user.id)) {
                member.roles.remove("999868292162404464");
                const embed = new Discord.MessageEmbed()
                    .setTitle("2022'd")
                    .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()
                    .setDescription(`${member.user.tag} has been 2022'd.`)
                    .setColor(client.config.embedcolors.default)
                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true })
            }
        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setColor(client.config.embedcolors.error)
                .setTitle(`Error.`)
                .addField('Failed to remove role from: ', `${member.user.username}`)
                .addField('Error: ', `${err}`)
                .setTimestamp()
                .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

            await interaction.reply({ embeds: [embed] });
        }
	}
}