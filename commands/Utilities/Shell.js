const { MessageEmbed } = require('discord.js');
const child = require ('child_process')

module.exports = {
    ownerOnly: true,
    config: {
        name: "shell",
        description: "Show Guild Information!",
        category: "Utilities",
        accessableby: "Owner",
        aliases: ["sh"]
    },
    run: async (client, message, args, user, language, prefix) => {
        
        const command = args.join(" ");
        if(!command) return message.reply('pls specific a module to install');
      
        child.exec(command, (err, res) => {
          if(err) return console.log(err);
          let all = res.slice(0, 2000);
          message.channel.send(`\`\`\`js\n${all}\`\`\``);

    }
  )}
}
