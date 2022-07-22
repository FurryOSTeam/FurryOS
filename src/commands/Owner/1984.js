const Discord = require('discord.js');

const ids = {
    id: ["345959027143999490", "502947692046057473", "615225900514017312"]
}

module.exports = {
    name: "1984",
    usage: "/1984 <user>",
    category: "Owner",
    description: "1984s a user.",
    ownerOnly: false,
    options: [
        {
            name: "user",
            description: "1984s a user.",
            type: 'USER',
            required: true
        }
    ],
    run: async (client, interaction) => {
        try {
            if (ids.id.includes(interaction.user.id)) {
                const member = interaction.options.getUser("user");
                member.roles.add("999868292162404464");
                const embed = new Discord.MessageEmbed()
                    .setTitle("1984'd")
                    .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()
                    .setDescription(`${member.user.tag} has been 1984'd.`)
                    .setColor(client.config.embedcolors.default)
                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true })
            }
        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setColor(client.config.embedcolors.error)
                .setTitle(`Error.`)
                .addField('Failed to give role to: ', `${member.user.username}`)
                .addField('Error: ', `${err}`)
                .setTimestamp()
                .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

            await interaction.reply({ embeds: [embed] });
        }
	}
}