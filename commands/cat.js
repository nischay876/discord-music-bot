const Discord = require("discord.js")
const superagent = require("superagent")
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "cat",
  description: "sends a picture of a cat",
  accessableby: "Members",
  aliases: ["catto"],
  run: async (client, message, args) => {

    let { body } = await superagent
      .get(`http://aws.random.cat/meow`)
    //console.log(body.file)
    if (!{ body }) return message.channel.send("I broke :( Try again.")

    let embed = new MessageEmbed()
      .setColor(client.botconfig.EmbedColor)
      .setImage(body.file)

    message.channel.send(embed);
  },
} 
