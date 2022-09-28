const { MessageEmbed, Permissions } = require('discord.js');

module.exports = { 
    config: {
        name: "purge",
        aliases: ["dm"],
        description: "Purge messiges in bulk",
        accessableby: "Member",
        category: "Moderation",
    },
    run: async (client, message, args, user, language, prefix) => {

        let specifyamountembed = new MessageEmbed()

       .setColor(client.color)
        .setDescription(`<@${message.author.id}> Please specify the amount of messages you want me to delete`)
  
      let permissionembed = new MessageEmbed()
  
       .setColor(client.color)
        .setDescription(`<@${message.author.id}> only server administrators are allowed to use purge command`)
  
      var amount = parseInt(args[0])
  
      if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({ embeds: [permissionembed] });
  
      if (!amount) return message.channel.send({ embeds: [specifyamountembed] });
  
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
