const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'covid',
    description: 'Shows info about covid in that location.',
  	aliases: ['covid'],
  	usage: '<location>',
	  category: 'Info',
async execute(client, message, args, Discord){
    let countries = args.join(" ");

    if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`❌ You need to provide a country to track covid statistics`)
    .setTimestamp()
    .setFooter('FurryOS'))

    if(args[0] === "all"){
        fetch(`https://covid19.mathdro.id/api`)
        .then(response => response.json())
        .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()

            const embed = new Discord.MessageEmbed()
            .setTitle(`Worldwide COVID-19 Statistics`)
            .addField('Confirmed Cases', confirmed)
            .addField('Recovered', recovered)
            .addField('Deaths', deaths)
            .setColor('BLUE')
            .setTimestamp()
            .setFooter('FurryOS')
            message.channel.send(embed)
        })
    } else {
        fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then(response => response.json())
        .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()

            const embed = new Discord.MessageEmbed()
            
            .setTitle(`COVID-19 Statistics for **${countries.toUpperCase()}**`)
            .addField('Confirmed Cases', confirmed)
            .addField('Recovered', recovered)
            .addField('Deaths', deaths)
            .setColor('BLUE')
            .setTimestamp()
            .setFooter('FurryOS')
            message.channel.send(embed)
        }).catch(e => {
            message.channel.send(new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`❌ Invalid argument provided`)
            .setTimestamp()
            .setFooter('FurryOS'))
        })
    }
}
}