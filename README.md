<p align="center">
<a href="https://discord.com/oauth2/authorize?client_id=840765753983762434&permissions=8&scope=bot"><img src="https://cdn.discordapp.com/attachments/830220362326999041/863234691652649000/shittyawesome.png" alt="FurryOS" height="150" /></a>
</p>


<h1 align="center">FurryOS source code & documentation</a></h1>

## Self-hosting instructions
Self-hosting is recommended for advanced users only who are experienced with the Node.js ecosystem. Note that setup or code support will not be given for attempting to run your own instance of FurryOS, modified or otherwise.

1. To get FurryOS ready to run locally, the first step is to clone this repository onto the machine you wish to run it on.
2. **Newest version of Node.js is recommended to run FurryOS.**
3. Use NPM to install the dependencies from the project folder: `npm install`
4. Create a .env file with the properties listed in the .env section.
5. Start the bot from the project folder: `node .`

### Environment variables
Various environment variables for all of the bots main features.
```
{
  "mongopath": "MongoDB SRV String", 
  "yiffykey": "Yiffy API Key",
  "token": "Bot token",
  "userAgent": "User agent here"
}
```
### Obtaining certain ENV variables
To obtain certain .env variables, please look below:

<a href="https://docs.mongodb.com/manual/reference/connection-string/">MongoDB String documentation for the mongopath variable</a>

<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent">User Agent documentation for the userAgent variable</a>

<a href="https://www.npmjs.com/package/yiffy">Yiffy documentation for the yiffykey variable</a>

<a href="https://discord.com/developers/docs/intro">Discord API documentation for the token variable</a>
