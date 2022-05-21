const chalk = require("chalk");
const figlet = require('figlet');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        
     let statuses = [
          {game: {name: `shork owo`}, type: "LISTENING"},
          {game: {name: `${client.guilds.cache.size} servers`}, type: "LISTENING"},
          {game: {name: `Discord.JS v13 wooooo`}, type: "LISTENING"}
      ];
      let i = 0;
      setInterval(() => {
           let status = statuses[i];
           if(!status){
               status = statuses[0];
               i = 0;
           }
           client.user.setPresence(status);
           i++;
      }, 15000);
      
      console.log(`${chalk.hex("#5b57d9")(figlet.textSync('FurryOS', { horizontalLayout: 'full' }))}\n`);
      console.log(`${chalk.hex('#60bf85')('Bot started!')}\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
      + `${chalk.hex('#ffaa2b')('>')} ${chalk.hex('#7289DA')(`Servers: ${chalk.hex('#4e5f99')(`${client.guilds.cache.size}`)}`)}\n`
      + `${chalk.hex('#ffaa2b')('>')} ${chalk.hex('#7289DA')(`Channels: ${chalk.hex('#4e5f99')(`${client.channels.cache.size}`)}`)}`);
    }
}