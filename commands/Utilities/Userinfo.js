const moment = require('moment');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "userinfo",
        description: "Show User Information!",
        category: "Utilities",
        accessableby: "member",
        aliases: ["ui"]
    },
    run: async (client, message, guild, args, user, language, prefix) => {
      let userArray = message.content.split(" ");
      let userArgs = userArray.slice(1);
      let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        if(!member) {
          try {
            member = await message.guild.members.fetch(args[0])
          } catch {
            member = message.member;
          }
        }
            
        // Trim roles
        let rolesname;
        let roles = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.toString())
                .slice(0, -1);
        
        rolesname = roles.join(" ")
        if(member.roles.cache.size < 1) rolesname = "No Roles"
        
        
        if(!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles = `\`None\``
            const embed = new MessageEmbed()
           
        
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic : true }))
              .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
              .setFooter(`ID: ${member.id}`)
              .setTimestamp()
              .setColor(client.colour)
              .setDescription(`**User:** \`${member.user.username}\` | \`#${member.user.discriminator}\`\n**ID:** \`${member.id}\`\n**Joined Discord At:** \`${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\`\n**Joined Server on:** \`${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\`\n**Roles [${roles.length || '0'}]: ** ${rolesname || `\`That user has no roles\``}`)

            message.channel.send({embeds: [embed]});
    }
};