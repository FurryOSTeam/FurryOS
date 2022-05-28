const chalk = require("chalk");
const figlet = require('figlet');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {

      const activities = [
        `/help`,
	      `shork owo`,
	      `${client.guilds.cache.size} servers`,
        `Discord.JS v13 wooooo`
      ];
      
      let i = 0;
      
      setInterval(() => client.user.setPresence({ status: 'idle', activities: [{ name: `${activities[i++ % activities.length]}`, type: 'LISTENING'}]}), 15000);
      
      console.log(`${chalk.hex("#5b57d9")(figlet.textSync('FurryOS', { horizontalLayout: 'full' }))}\n`);
      console.log(`${chalk.hex('#60bf85')('Bot started!')}\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
      + `${chalk.hex('#ffaa2b')('>')} ${chalk.hex('#7289DA')(`Servers: ${chalk.hex('#4e5f99')(`${client.guilds.cache.size}`)}`)}\n`
      + `${chalk.hex('#ffaa2b')('>')} ${chalk.hex('#7289DA')(`Channels: ${chalk.hex('#4e5f99')(`${client.channels.cache.size}`)}`)}`);
    }
}
