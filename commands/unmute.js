const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute', 
    description: "Unmute server members",
    permissions: ['MANAGE_ROLES'],
    usage: "[@mention/ID]",
    aliases: [''],
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("**only server administrators are allowed to use ummute command**")

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`**<@${Member.id}> is now unmuted**`)
    }
}