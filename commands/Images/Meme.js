const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const {eMeme, sMeme, all} = require("discord.js-memes")

module.exports = { 
    config: {
        name: "meme",
        description: "Sends a meme picture",
        accessableby: "Member",
        category: "meme",
    },
    run: async (client, message, args, user, language, prefix) => {

        const english = new eMeme()
        .setType(1) //for all the english memes

        const Embed = new MessageEmbed()
        .setColor(client.color)
        .setImage(english)
    
                message.channel.send({ embeds: [Embed] });
   
    },
}
