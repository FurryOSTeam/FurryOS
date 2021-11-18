const discord = require("discord.js");

module.exports = {
    name: 'math',
    description: 'Answers math questions.',
  	aliases: ['math'],
  	usage: '[number] [+ | - | * | /] [number]',
	  category: 'Fun',
async execute(client, message, args, Discord){
    if(!args[0]) return message.reply('Enter a first number');
    if(!args[1]) return message.reply('Enter an operator');
    if(!args[2]) return message.reply('Enter a second number');

    message.channel.send(calculator(args[0], args[1], args[2]));
  }
}

function calculator(num1, operator, num2){
  if(isNaN(num1)) return 'Number 1 is not a number'; 
  if(isNaN(num2)) return 'Number 2 is not a number'; 
  switch(operator){
    case "+":
      return parseInt(num1) + parseInt(num2);
      break;
    case "-":
      return num1 - num2;
      break;
    case "*":
      return num1 * num2;
      break;
    case "/":
      return (num1 / num2).toFixed(2);
      break;
    default:
      return "Enter a valid operator (+|-|*|/)";
      break;
  }
}