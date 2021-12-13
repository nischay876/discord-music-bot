const Discord = require("discord.js")
const superagent = require("superagent")
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "dog",
  description: "Sends a cute or funny picture of a dog",
  usage: "",
  accessableby: "Members",
  aliases: ["doggo", "puppy"],
  run: async (client, message, args) => {

    let { body } = await superagent
      .get(`https://dog.ceo/api/breeds/image/random`)
    //console.log(body.file)
    if (!{ body }) return message.channel.send("**I broke:( Try again.**")

    let embed = new MessageEmbed()
      .setColor(client.botconfig.EmbedColor)
      .setImage(body.message)

    message.channel.send(embed);
  }
}