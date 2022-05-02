const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const { GetUser, GetGlobalUser } = require("../handlers/functions.js")
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
  if (Array.from(arr.values()).length > maxLen) {
    const len = Array.from(arr.values()).length - maxLen;
    arr = Array.from(arr.values()).sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
    arr.map(role => `<@&${role.id}>`)
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}
const statuses = {
  "online" : "🟢",
  "idle" : "🟠",
  "dnd" : "🔴",
  "offline" : "⚫️",
}
module.exports = {
  name: 'userinfo',
  description: 'Shows info about a user.',
  aliases: ['userinfo'],
  usage: '<@user>',
	category: 'Info',
async execute(client, message, args, Discord){
    var user;
      if(args[0]){
        try{
          if(args[1] && args[1].toLowerCase() == "global"){
            args.pop()
            user = await GetGlobalUser(message, args)
          }else {
            user = await GetUser(message, args)
          }
        }catch (e){
          if(!e) return message.reply("UNABLE TO FIND THE USER")
          return message.reply(e)
        }
      }else{
        user = message.author;
      }
      if(!user || user == null || user.id == null || !user.id) return message.reply("❌ Could not find the USER")
        const member = message.guild.members.cache.get(user.id);
        const roles = member.roles;
        const userFlags = member.user.flags.toArray();
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor({ name: "Information about: " + member.user.username + "#" + member.user.discriminator, iconURL: member.user.displayAvatarURL({ dynamic: true })})
        embeduserinfo.addField('**❱ Username:**',`<@${member.user.id}>\n\`${member.user.tag}\``,true)
        embeduserinfo.addField('**❱ ID:**',`\`${member.id}\``,true)
        embeduserinfo.addField('**❱ Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`,true)
        embeduserinfo.addField('**❱ Date Join DC:**', "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
        embeduserinfo.addField('**❱ Date Join Guild:**', "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
        embeduserinfo.addField('**❱ Flags:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``,true)
        embeduserinfo.addField('**❱ Highest Role:**',`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`,true)
        embeduserinfo.addField('**❱ Is a Bot:**',`\`${member.user.bot ? "✔️" : "❌"}\``,true)
        embeduserinfo.addField('**❱ Permissions:**',`${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.addField(`❱ [${roles.cache.size}] Roles: `, roles.cache.size < 25 ? Array.from(roles.cache.values()).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None')
        embeduserinfo.setColor('#3498db')
        message.channel.send({embeds: [embeduserinfo]})
  }
}