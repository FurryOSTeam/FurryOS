const { MessageEmbed } = require('discord.js');

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
        let channel = interaction.options.getChannel("channel");

        let embed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(interaction.guild.iconURL())
            .addField("**NSFW**", channel.nsfw, true)
            .addField("**Channel ID**", channel.id, true)
            .addField("**Channel Type**", channel.type)
            .addField("**Channel Description**", `${channel.topic || "No Description"}`)
            .addField("**Channel Created At**", channel.createdAt)
            .setColor("BLUE")
        await interaction.reply({ embeds: [embed] });
    }
}