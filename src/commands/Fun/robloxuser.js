const Discord = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
    name: "robloxuser",
    usage: "/robloxuser <username>",
    category: "Fun",
    description: "Shows info about a roblox user.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'username',
            description: 'The name of the roblox user.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
    try {
        const name = interaction.options.getString("username");
        const userid = await noblox.getIdFromUsername(name);

        await noblox.getPlayerInfo(userid).then((playerInfo) => {
        const infoEmbed = new Discord.EmbedBuilder()
            .setURL(`https://www.roblox.com/users/${userid}/profile`)
            .setTitle(`${playerInfo.username}'s profile`)
            //.addField(`Status`, `${playerInfo.status}` || "Not available", true) //gone BOOHOO WAAA OSAHFDSHFGSDGFSUIRGFRUIGFHRGNFIUG
            .addFields([
                { name: `User ID`, value: `${userid || "Not available"}`, inline: true },
                { name: `Account Age (in days)`, value: `${playerInfo.age || "Not available"}`, inline: true },
                { name: `Join Date`, value: `${playerInfo.joinDate || "Not available"}`, inline: true },
                { name: `User Display Name`, value: `${playerInfo.displayName || "Not available"}`, inline: true },
                { name: `Is Banned`, value: `${playerInfo.isBanned}`, inline: true },
                { name: `Friends`, value: `${playerInfo.friendCount || "Not available"}`, inline: true },
                { name: `Followers`, value: `${playerInfo.followerCount || "Not available"}`, inline: true },
                { name: `Following`, value: `${playerInfo.followingCount || "Not available"}`, inline: true },
                { name: `Description`, value: `${playerInfo.blurb || "Not available"}` }
            ])
            .setTimestamp()
            .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`)
            .setColor(client.config.embedcolors.default)
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
        interaction.reply({ embeds: [infoEmbed] });
        });
    } catch (e) {
        interaction.reply({ embeds: [new Discord.EmbedBuilder()
            .setColor(client.config.embedcolors.error)
            .setTitle(`Error.`)
            .setDescription(`Either you did not type the name correctly, the user does not exist, or the command errored.`)
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true })})], ephemeral: true });
        }
    }
};