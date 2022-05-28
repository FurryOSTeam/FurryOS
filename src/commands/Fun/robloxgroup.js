const Discord = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
    name: "robloxgroup",
    usage: "/robloxgroup <group name>",
    category: "Fun",
    description: "Shows info about a roblox group.",
    ownerOnly: false,
    options: [
        {
            name: 'group-name',
            description: 'The name of the roblox group.',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        try{
            const name = interaction.options.getString("group-name");
            const groupsearch = await noblox.searchGroups({keyword: name, prioritizeExactMatch: 'true', limit: '1'});
            const group = groupsearch[0].id;
            const groupGames = await noblox.getGroupGames({groupId: group, accessFilter: 'All', sortOrder: 'Asc', limit: '100'})
            const groupInfo = await noblox.getGroup(group);
            const roles = await noblox.getRoles(group);
            const logo = await noblox.getLogo(group);
    
            const embed = new Discord.MessageEmbed() //BRO WHY IS THERE A CHARACTER LIMIT TO STUFF SOME GROUPS HAVE LIKE THOUSANDS OF GAMES!11!!!1 Later: OH MY GOD WTF THE WALL IS SO BIG https://images.bigbenster702.com/bv4rQYc
                    .setTitle(`Info for group ${groupInfo.name}`)
                    .setThumbnail(logo)
                    .setDescription(`**Group games: ** ${groupGames.map((group) => " ``" + group.name + "``")} **\n\nGroup roles and ranks: ** ${roles.map((role) => "``" + role.name + " | " + role.rank +"``" )}`, true)
                    //.addField("**Group games**", `${groupGames.map((group) => " ``" + group.name + "``")}`, true)
                    //.addField("**Group roles and ranks**", `${roles.map((role) => "``" + role.name + " | " + role.rank +"``" )}`, true)
                    .addField("**Group description**", `${groupInfo.description}`, true)
                    .addField("**Group members**", `${groupInfo.memberCount}`, true)
                    .setColor(client.config.embedcolors.default);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }catch(e){
            interaction.reply({ embeds: [new Discord.MessageEmbed()
                .setColor(client.config.embedcolors.error)
                .setTitle(`Error.`)
                .setDescription(`Either you did not type the name correctly, the group does not exist, or the command errored.`)
                .setTimestamp()
                .setFooter({ text: client.config.embedfooterText})], ephemeral: true });
        }
    }
};