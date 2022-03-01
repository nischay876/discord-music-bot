const message = require('discord-reply');

module.exports = {
  name: 'serverinvite',
  description: "Makes a server invite",
  usage: "",
  aliases: ['sinv'],
  run: async (client, message, args) => {
    let invite = await message.channel.createInvite({
  maxAge: 0, // 0 = infinite expiration
  maxUses: 0 // 0 = infinite uses
}).catch(console.error);

    message.channel.send(invite ? `**Here's your server invite**: ${invite}` : "There has been an error during the creation of the invite.");
  }
}