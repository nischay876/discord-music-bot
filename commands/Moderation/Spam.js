const { MessageEmbed, Permissions } = require('discord.js');
const talkedRecently = new Set();

const TrackAdd = [];

module.exports = { 
    config: {
        name: "spam",
        usage: "spam any user 10 times",
        description: "Add song to a playlist",
        accessableby: "Premium",
        category: "Moderation",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {

                let permissionembed = new MessageEmbed()
                .setColor(client.color)
                .setDescription(`<@${message.author.id}> Only Server Administrators Are Allowed To Spam Tag`)
            
                let usageembed = new MessageEmbed()
                .setColor(client.color)
                .setTitle("Command Usage")
                .setDescription(`-spam [@mention]`)
            
                let timeembed = new MessageEmbed()
                .setColor(client.color)
                .setTitle("Timeout 5 minutes")
                .setDescription(`You need to wait 5 minutes to use this command again`)
            
                if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({embeds: [permissionembed]});
            
                let spamm = args.slice(0).join(' ');
                
                if(message.mentions.users.size === 0){  
                return message.channel.send({embeds: [usageembed]});
                }
            
                if (talkedRecently.has(message.author.id)) {
                message.channel.send({embeds: [timeembed]});
                } else {
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                message.channel.send(`${spamm}`);
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                talkedRecently.delete(message.author.id);
                }, 300000); }
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
         //   .addField('STORE WEBSITE', '[**HERE**](https://mecute.tebex.io)', true)
            .addField('1 YEAR', '[**HERE**](https://mecute.tebex.io/package/5101638)', true)
            .addField('6 MONTH', '[**HERE**](https://mecute.tebex.io/package/5101650)', true)
            .addField('1 MONTH', '[**HERE**](https://mecute.tebex.io/package/5101652)', true)
            .setColor(client.color)
            .setTimestamp()

        return message.reply({ content: " ", embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};
