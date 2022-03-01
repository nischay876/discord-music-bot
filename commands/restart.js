const { message , MessageEmbed , MessageReaction } = require("discord.js");

module.exports = {
	name: 'restart',
  description: 'Restart The Bot',
  aliases: ["re"],
	run: async (client, message, args) => {
	
		let noperembed = new MessageEmbed()
		.setColor(client.botconfig.EmbedColor)
		.setDescription('**Only Bot Owner [OGGY#9889](https://oggy.ga) Can Use This Command**')
  
		if (message.author.id != `${client.botconfig.Admins}`) 
		return message.channel.send(noperembed) 
  
		let restartingembed = new MessageEmbed()
		.setColor(client.botconfig.EmbedColor)
		.setDescription(`**${message.author.tag} IS RESTARTING BOT...**`)	  	
	 	
	  let Config = new MessageEmbed()
      .setColor(client.botconfig.EmbedColor)
      .setDescription(`Are You Sure To Restart The Bot?`);

	  let ConfigMessage = await message.channel.send(Config);
	  await ConfigMessage.react("🇾");
	  await ConfigMessage.react("🇳");
	  let emoji = await ConfigMessage.awaitReactions(
		(reaction, user) =>
		  user.id === message.author.id &&
		  ["🇾", "🇳"].includes(reaction.emoji.name),
		{ max: 1, errors: ["time"], time: 10000 }
	  ).catch(() => {
		ConfigMessage.reactions.removeAll();
		client.sendTime(
		  message.channel,
		  "**You took too long to respond**"
		);
		ConfigMessage.delete(Config);
	  });
	  let isOk = false;
	  try {
		emoji = emoji.first();
	  } catch {
		isOk = true;
	  }
	  if (isOk) return; //im idiot sry ;-;
	  /**@type {MessageReaction} */
	  let em = emoji;
	  ConfigMessage.reactions.removeAll();
	  if (em._emoji.name === "🇾") {
	  message.channel.send(restartingembed)
	  setTimeout(function(){ 
	  return process.exit();
	  }, 2000);

	} else {
		await client.sendTime(
		  message.channel,
		  "terminated"
		);
	  }
   },
}