const Discord = require('discord.js');

module.exports = {
    name: "rps",
    category: "Fun",
    description: "Starts a game of rock, paper, scissors.",
    ownerOnly: false,
    options: [
        {
            name: 'option',
            description: 'Rock, paper, or scissors.',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
  let userChoice = interaction.options.getString("option").toLowerCase();
  var number = Math.round(Math.random() * 3)
  let computerChoice
  
  if(number == 1)
  {
    computerChoice = "rock"
  }
  else if(number == 2)
  {
    computerChoice = "paper"
  }
  else
  {
    computerChoice = "scissors"
  }
  
  if(userChoice == "rock" && computerChoice == "paper")
  {
    return interaction.reply(`You have lost! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "paper" && computerChoice == "rock")
  {
    return interaction.reply(`You have won! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "paper" && computerChoice == "scissors")
  {
    return interaction.reply(`You have lost! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "scissors" && computerChoice == "paper")
  {
    return interaction.reply(`You have won! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "rock" && computerChoice == "scissors")
  {
    return interaction.reply(`You have won! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "rock" && computerChoice == "scissors")
  {
    return interaction.reply(`You have lost! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "rock" && computerChoice == "rock")
  {
      return interaction.reply("TIE!")
  }
  else if(userChoice == "paper" && computerChoice == "paper")
  {
      return interaction.reply("TIE!")
  }
  else if(userChoice == "scissors" && computerChoice == "scissors")
  {
      return interaction.reply("TIE!")
  }
  }
}