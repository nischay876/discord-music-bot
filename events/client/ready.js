const figlet = require('figlet');
const chalk = require('chalk');
const PremiumUser = require('../../settings/models/PremiumUser.js')
const Discord = require("discord.js");

module.exports = async (client) => {
  
    client.on("guildCreate", async (guild) => {
      
      const User = guild.members.cache.filter(member => !member.user.bot).size;
      const Bots = guild.members.cache.filter(member => member.user.bot).size;

        let channel = new Discord.WebhookClient({ url: 'https://discord.com/api/webhooks/955124784772055060/bjQ8xA0pR6vtA9ZmXOvSw1AzcWi4kehOezFwNFW7saFCSOZfZJPrU8_xTyJguKf4CBLo' })
        const embed = new Discord.MessageEmbed()
            .setThumbnail(guild.iconURL({ dynamic: true }))
          //  .setDescription(`${guild.name} ${guild.ownerID} ${guild.id} ${guild.memberCount}`)
            .setTitle(`New Server! ${guild.name}`)
            .addField("Server Name", `${guild.name}`,true)
            .addField("Server ID", `${guild.id}`,true)
            .addField("Owner ID", `${await guild.fetchOwner().then(m => m.user.id)}`,true)
            .addField("Owner Tag", `${await guild.fetchOwner().then(m => m.user.tag)}`,true)
            .addField("Owner Mention", `<@${await guild.fetchOwner().then(m => m.user.id)}>`,true)
            .addField('Member Count', ` ${guild.memberCount} [${User} Users | ${Bots} Bots]`, true)
    
            client.channels.cache.get('976533088513445928').send({embeds: [embed]})
          //  channel.send({embeds: [embed]})
    });

    client.manager.init(client.user.id);
    figlet(client.user.tag, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red.bold(data));
    });

    const users = await PremiumUser.find();
    for (let user of users) {
      client.premiums.set(user.Id, user);
    }

    let guilds = client.guilds.cache.size;
    let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
    let channels = client.channels.cache.size;

    const activities = [
        `${client.prefix}help | ${guilds} servers`,
        `${client.prefix}help | ${members} users`,
        `${client.prefix}help | ${channels} channels`,
      //  `${client.prefix}play <input> | ${members} users`,
      //  `${client.prefix}doubletime | ${channels} channels`,
    ]

    setInterval(() => {
        client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, { type: 'WATCHING' });
    }, 15000)

};
