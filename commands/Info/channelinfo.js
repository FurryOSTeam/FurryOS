const Discord = require('discord.js');

module.exports = {
    name: "channelinfo",
    category: "Info",
    description: "Shows info about a channel.",
    ownerOnly: false,
    options: [
        {
            name: "channel",
            description: "Channel to show info about.",
            type: 'CHANNEL',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");

        const embed = new Discord.MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }))
            .addField("**NSFW**", `${channel.nsfw || "Channel does not have nsfw setting."}`, true)
            .addField("**Channel ID**", `${channel.id}`, true)
            .addField("**Channel Type**", `${channel.type}`)
            .addField("**Channel Description**", `${channel.topic || "No Description"}`)
            .addField("**Channel Created At**", `${channel.createdAt}`)
            .setColor(client.config.embedcolors.default);
        await interaction.reply({ embeds: [embed] });
    }
}