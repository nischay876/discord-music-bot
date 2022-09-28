const { Client, Interaction, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const apiKey = "b65b724e-9df4-41ce-867a-28216fa69afe";

module.exports = { 
    config: {
        name: "cat",
        description: "Sends a cat picture",
        accessableby: "Member",
        category: "Images",
    },
    run: async (client, message, args, user, language, prefix) => {
      try {
        await message.channel.send().catch(_ => {});
  
        const fetchAPI = async () => {
          const response = await fetch(`https://api.thecatapi.com/v1/images/search`, {
            method: "GET",
            headers: {"x-api-key": apiKey}
          })
  
          const jsonresp = await response.json();
          return await jsonresp[0].url;
        }
  
        const embed = new MessageEmbed().setColor(client.color);
  
  
        embed.setImage(await fetchAPI())
        await message.channel.send({embeds: [embed]})
  
      } catch (err) {
        console.log("Something Went Wrong => ",err);
      }
    },
}
