const { MessageEmbed } = require('discord.js');

module.exports = {
   // ownerOnly: true,
    config: {
        name: "arestart",
        description: "Shuts down the client!",
        usage: "shutdown",
      //  category: "Utilities",
        accessableby: "Owner",
        aliases: ["are"]
    },
    run: async (client, message, args, user, language, prefix) => {

        let noperembed = new MessageEmbed()
		.setColor(client.color)
		.setDescription('**Only Ansu Can Use This Command**')
  
		if (message.author.id != `710045256317534208`) 
		return message.channel.send({ embeds: [noperembed] });

    const restart = new MessageEmbed()
        .setDescription(`${client.i18n.get(language, "utilities", "restart_msg")}`)
        .setColor(client.color);

    await message.channel.send({ embeds: [restart] });
            
    process.exit();
    }
};