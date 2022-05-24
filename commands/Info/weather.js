const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weather",
    category: "Info",
    description: "Shows the weather in a place you pick.",
    ownerOnly: false,
    options: [
      {
          name: "location",
          description: "Location for the weather.",
          type: 'STRING',
          required: true
      }
  ],
    run: async (client, interaction) => {
    weather.find({search: interaction.options.getString("location"), degreeType: 'F'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return interaction.reply({ content: error, ephemeral: true });

        if(result === undefined || result.length === 0) return interaction.reply({ content: '**Invalid** location', ephemeral: true });

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor({ name: `Weather forecast for ${current.observationpoint}` })
        .setThumbnail(current.imageUrl)
        .setColor('RANDOM')
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Fahrenheit', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Wind', current.winddisplay, true)
        .addField('Feels like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)
        .addField('Day', `${current.day}`, true)

        interaction.reply({ embeds: [weatherinfo] })
        })        
    }
}