const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'purge',
  description: "Delete messiges in bulk",
  permissions: ['ADMINISTRATOR'],
  usage: "[number]",
  aliases: ['dm'],

  run: async (client, message, args) => {

    let specifyamountembed = new MessageEmbed()

      .setColor(client.botconfig.EmbedColor)
      .setDescription(`<@${message.author.id}> Please specify the amount of messages you want me to delete`)

    let permissionembed = new MessageEmbed()

      .setColor(client.botconfig.EmbedColor)
      .setDescription(`<@${message.author.id}> only server administrators are allowed to use purge command`)

    var amount = parseInt(args[0])

    if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(permissionembed);

    if (!amount) return message.channel.send(specifyamountembed);

    if (amount > 100 || amount < 1) return message.reply("**Please select a number between 1 and 100**")

    message.channel.bulkDelete(amount).catch(err => {
      message.channel.send('`Due to Discord Limitations, I cannot delete messages older than 14 days`')
    })

    let msg = await message.channel.send(`Deleted \**${amount}\** messages`)
    setTimeout(() => {
      msg.delete()
    }, 5000)
  }
}