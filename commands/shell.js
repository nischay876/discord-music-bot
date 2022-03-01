const { MessageEmbed } = require('discord.js')

const child = require ('child_process')

module.exports = {
    name: 'shell',
    description: 'Run a command on shell',
    aliases: ['terminal'],
    
    run: async(client, message, args) => {
     
      let noperembed = new MessageEmbed()
      .setColor(client.botconfig.EmbedColor)
      .setDescription('**Only Bot Owner [OGGY#9889](https://www.oggy.ga) Can Use This Command**')
    
      if (message.author.id != `${client.botconfig.Admins}`) 
      return message.channel.send(noperembed) 
      
      const command = args.join(" ");
      if(!command) return message.reply('pls specific a module to install');
      
      child.exec(command, (err, res) => {
        if(err) return console.log(err);
        message.channel.send(res.slice(0, 2000), { code: 'text'});
    })
  }
}
