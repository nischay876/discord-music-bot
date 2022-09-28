const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "skipto",
    description: "Skips to a certain song in the queue.",
    options: [
        {
            name: "position",
            description: "The position of the song in the queue.",
            type: 4,
            required: true,
        }
    ],
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getInteger("position");
        const msg = await interaction.editReply(`${client.i18n.get(language, "music", "skipto_loading")}`);

		if (value === 0) return msg.edit(`${client.i18n.get(language, "music", "skipto_arg", {
            prefix: "/"
        })}`);

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		if ((value > player.queue.length) || (value && !player.queue[value - 1])) return msg.edit(`${client.i18n.get(language, "music", "skipto_invalid")}`);
		if (value == 1) player.stop();

		await player.queue.splice(0, value - 1);
        await player.stop();
        
        const skipto = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "skipto_msg", {
                position: value
            })}`)
            .setColor(client.color);

        msg.edit({ content: " ", embeds: [skipto] });
    }
}