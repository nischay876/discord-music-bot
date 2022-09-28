
const superagent = require("superagent");
const { Discord, MessageEmbed }= require('discord.js');

module.exports = {
    config: {
        name: "instagram",
        descripation: "Show Bot Information!",
        category: "Utilities",
        accessableby: "member",
        aliases: ["insta"]
    },
    run: async (client, message, guild, user, language, prefix) => {

        var color = "#130033";
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        let query = args.join(" ");
        let insta = await superagent
        
        .get(`https://api.badboy.is-a.dev/json/instauser?username=${query}`);
        let embed = new MessageEmbed()
        .setColor(client.color)
        .setTitle(`Instagram info of ${query}`)
        .addField("name", "" + insta.body.name, true) 
        .addField("username", "" + insta.body.username, true)
        .addField("external_url", "" + insta.body.external_url, true)
        .addField("posts", "" + insta.body.posts, true)
        .addField("reels", "" + insta.body.reels, true)
        .addField("followers", "" + insta.body.followers, true)
        .addField("following", "" + insta.body.following, true)
        .addField("private", "" + insta.body.private, true)
        .addField("verified", "" + insta.body.verified, true)
        .addField("url", "" + insta.body.url, true)
        .setThumbnail(insta.body.profile_pic)

       message.channel.send({ embeds: [embed] })
    }
}
