const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    config: {
        name: "premium",
        description: "Show Information!",
        category: "Premium",
        accessableby: "member",
        aliases: [""]
    },
    run: async (client, message) => {
        
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: "Buy Premium!", iconURL: client.user.displayAvatarURL() })
            .setDescription( "you can buy premium plan from our store at ** https://mecute.tebex.io **")
         //   .addField('STORE WEBSITE', '[**HERE**](https://mecute.tebex.io)', true)
            .addField('1 YEAR', '[**HERE**](https://mecute.tebex.io/package/5101638)', true)
            .addField('6 MONTH', '[**HERE**](https://mecute.tebex.io/package/5101650)', true)
            .addField('1 MONTH', '[**HERE**](https://mecute.tebex.io/package/5101652)', true)
            .setColor(client.color)
            .setTimestamp()

        return message.reply({ content: " ", embeds: [Premiumed] });

    }
};

