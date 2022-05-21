module.exports.GetUser = GetUser;
module.exports.GetGlobalUser = GetGlobalUser;

function GetUser(message, arg){
    var errormessage = ":x: I failed finding that User...";
    return new Promise(async (resolve, reject) => {
      var args = arg, client = message.client;
      if(!client || !message) return reject("CLIENT IS NOT DEFINED")
      if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
      let user = message.mentions.users.first();
      if(!user && args[0] && args[0].length == 18) {
        user = await client.users.fetch(args[0])
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else if(!user && args[0]){
        let alluser = message.guild.members.cache.map(member=> String(member.user.tag).toLowerCase())
        user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
        user = message.guild.members.cache.find(me => String(me.user.tag).toLowerCase() == user)
        if(!user || user == null || !user.id) {
          alluser = message.guild.members.cache.map(member => String(member.displayName + "#" + member.user.discriminator).toLowerCase())
          user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
          user = message.guild.members.cache.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user)
          if(!user || user == null || !user.id) return reject(errormessage)
        }
        user = await client.users.fetch(user.user.id)
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else {
        user = message.mentions.users.first() || message.author;
        return resolve(user);
      }
   })
}

function GetGlobalUser(message, arg){
    var errormessage = ":x: I failed finding that User...";
    return new Promise(async (resolve, reject) => {
      var args = arg, client = message.client;
      if(!client || !message) return reject("CLIENT IS NOT DEFINED")
      if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
      let user = message.mentions.users.first();
      if(!user && args[0] && args[0].length == 18) {
        user = await client.users.fetch(args[0])
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else if(!user && args[0]){
        let alluser = [], allmembers = [];
        var guilds = Array.from(client.guilds.cache.values())
        for(const g of guilds){
          var members = Array.from(g.members.cache.values());
          for(const m of members) { alluser.push(m.user.tag); allmembers.push(m); }
        }
        user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
        user = allmembers.find(me => String(me.user.tag).toLowerCase() == user)
        if(!user || user == null || !user.id) {
          user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
          user = allmembers.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user)
          if(!user || user == null || !user.id) return reject(errormessage)
        }
        user = await client.users.fetch(user.user.id)
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else {
        user = message.mentions.users.first() || message.author;
        return resolve(user);
     }
  })
} 