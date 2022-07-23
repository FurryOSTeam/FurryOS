const Discord = require('discord.js');

module.exports = {
    name: "channelinfo",
    usage: "/channelinfo <channel>",
    category: "Info",
    description: "Shows info about a channel.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: "channel",
            description: "Channel to show info about.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");

        const embed = new Discord.EmbedBuilder()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }))
            .addFields([
                { name: "**NSFW**", value: `${channel.nsfw || "Channel does not have nsfw setting enabled."}`, inline: true },
                { name: "**Channel ID**", value: `${channel.id}`, inline: true },
                { name: "**Channel Type**", value: `${channel.type}`, inline: true },
                { name: "**Channel Description**", value: `${channel.topic || "No Description"}`, inline: true },
                { name: "**Channel Created At**", value: `${channel.createdAt}`, inline: true }
            ])
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor(client.config.embedcolors.default);
        await interaction.reply({ embeds: [embed] });
    }
}