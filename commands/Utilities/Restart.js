const { MessageEmbed } = require('discord.js');

module.exports = {
    ownerOnly: true,
    config: {
        name: "restart",
        description: "Shuts down the client!",
        usage: "shutdown",
      //  category: "Utilities",
        accessableby: "Owner",
        aliases: ["stopbot","re"]
    },
    run: async (client, message, args, user, language, prefix) => {

    const restart = new MessageEmbed()
        .setDescription(`${client.i18n.get(language, "utilities", "restart_msg")}`)
        .setColor(client.color);

    await message.channel.send({ embeds: [restart] });
            
    process.exit();
    }
};