const Discord = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
    name: "robloxgroup",
    usage: "/robloxgroup <group id>",
    category: "Fun",
    description: "Shows info about a roblox group.",
    ownerOnly: false,
    options: [
        {
            name: 'group-id',
            description: 'The id of the roblox group.',
            type: 'NUMBER',
            required: true
        }
    ],
    run: async (client, interaction) => {
        //try{
            const group = interaction.options.getNumber("group-id");
            const groupGames = await noblox.getGroupGames({groupId: group, accessFilter: 'All', sortOrder: 'Asc', limit: '100'})
            const groupInfo = await noblox.getGroup(group);
            const roles = await noblox.getRoles(group);
            //const groupShout = await noblox.getShout(group);
            const logo = await noblox.getLogo(group);
    
            const embed = new Discord.MessageEmbed()
                    .setTitle(`Info for group ${groupInfo.name}`)
                    .setThumbnail(logo)
                    //.addField("**Current shout**", `${groupShout || "No current shout."}`, true)
                    //.addField("**Group games**", `${groupGames}`, true)
                    //.addField("**Group roles**", `${roles}`, true)
                    .setColor(client.config.embedcolors.default);

                    groupGames.forEach((games) => {
                        embed.addField(games.name);
                    });

                    roles.forEach((role) => {
                        embed.addField(role.name, `Rank: \`${role.rank || '0'}\``);
                    });
            await interaction.reply({ embeds: [embed] });
        //}catch(e){
            //interaction.reply({ embeds: [new Discord.MessageEmbed()
                //.setColor(client.config.embedcolors.error)
                //.setTitle(`Error.`)
                //.setDescription(`Either you did not type the id correctly, the group does not exist, or the command errored.`)
                //.setTimestamp()
                //.setFooter({ text: client.config.embedfooterText})], ephemeral: true });
        //}
    }
};