const Discord = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

module.exports = {
    name: "imageedittest",
    usage: "/imageedittest <user>",
    category: "Image",
    description: "Image test thingy.",
    ownerOnly: false,
    type: Discord.ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
          name: "user",
          description: "User to put.",
          type: Discord.ApplicationCommandOptionType.Mentionable,
          required: true
      }
  ],
    run: async (client, interaction) => {
        let user = interaction.options.getMentionable("user");

        const canvas = createCanvas(700, 250);
		const context = canvas.getContext('2d');

		const background = await readFile('../images/wallpaper.jpg');
		const backgroundImage = new Image();
		backgroundImage.src = background;
		context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

		context.strokeStyle = '#0099ff';
		context.strokeRect(0, 0, canvas.width, canvas.height);

		context.font = '28px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

		context.font = applyText(canvas, `${user.displayName}!`);
		context.fillStyle = '#ffffff';
		context.fillText(`${user.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

		context.beginPath();
		context.arc(125, 125, 100, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
		const avatar = new Image();
		avatar.src = Buffer.from(await body.arrayBuffer());
		context.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });

		interaction.reply({ files: [attachment] });
	}
}