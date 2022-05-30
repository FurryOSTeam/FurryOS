const Discord = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
    name: "robloxuser",
    usage: "/robloxuser <username>",
    category: "Fun",
    description: "Shows info about a roblox user.",
    ownerOnly: false,
    options: [
        {
            name: 'username',
            description: 'The name of the roblox user.',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
    try {
        const name = interaction.options.getString("username");
        const userid = await noblox.getIdFromUsername(name);

        await noblox.getPlayerInfo(userid).then((playerInfo) => {
        const infoEmbed = new Discord.MessageEmbed()
            .setURL(`https://www.roblox.com/users/${userid}/profile`)
            .setTitle(`${playerInfo.username}'s profile`)
            //.addField(`Status`, `${playerInfo.status}` || "Not available", true) //gone BOOHOO WAAA OSAHFDSHFGSDGFSUIRGFRUIGFHRGNFIUG
            .addField(`User ID`, `${userid}` || "Not available", true)
            .addField(`Account Age (in days)`, `${playerInfo.age}` || "Not available", true)
            .addField(`Join Date`, `${playerInfo.joinDate}` || "Not available", true)
            .addField(`User Display Name`, `${playerInfo.displayName}` || "Not available", true)
            .addField(`Is Banned`, `${playerInfo.isBanned}` || "Not available", true)
            .addField(`Friends`, `${playerInfo.friendCount}` || "Not available", true)
            .addField(`Followers`, `${playerInfo.followerCount}` || "Not available", true)
            .addField(`Following`, `${playerInfo.followingCount}` || "Not available", true)
            .addField(`Description`, `${playerInfo.blurb}` || "Not available")
            .setTimestamp()
            .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`)
            .setColor(client.config.embedcolors.default)
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
        interaction.reply({ embeds: [infoEmbed] });
        });
    } catch (e) {
        interaction.reply({ embeds: [new Discord.MessageEmbed()
            .setColor(client.config.embedcolors.error)
            .setTitle(`Error.`)
            .setDescription(`Either you did not type the name correctly, the user does not exist, or the command errored.`)
            .setTimestamp()
            .setFooter({ text: client.config.embedfooterText, iconURL: client.user.displayAvatarURL({ dynamic: true })})], ephemeral: true });
        }
    }
};