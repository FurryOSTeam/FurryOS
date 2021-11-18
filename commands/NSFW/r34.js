const fetch = require('node-fetch')
const parseString = require('xml2js').parseString;

module.exports = {
    name: 'r34',
    description: "Shows r34 of a tag.",
  	aliases: ['r34'],
  	usage: '<tags>',
	  category: 'Yiff',
async execute(client, message, args, Discord){
  if (message.author.bot) return false;
  if (message.channel.nsfw) {
  const arguments = args[0] ? args[0] : ''
  const url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + arguments;
  console.log(url)
  try {
    const response = await fetch(url)
    apiData = await response.text()
    parseString(apiData, function (error, result) {
      let postCount = result.posts.$.count - 1;
      if(postCount > 100) {
        postCount = 100;
      }
      if(postCount > 0) {
        var picNum = Math.floor(Math.random() * postCount) + 0;
        var r34Pic = result.posts.post[picNum].$.file_url;
        message.channel.send({
          files: [r34Pic]
        });
      } else {
        message.channel.send("Nobody here but us chickens!");
      }
    })
  } catch (error) {
    console.log(error)
    message.channel.send("There was error with rule34.xxx")
  }
  } else {
        message.channel.send("This channel is SFW. Make it NSFW to see NSFW commands.");
  }
}}