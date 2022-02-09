const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    await message.delete();
    const embed = new Discord.MessageEmbed();
    embed
        .setTitle(`Miaou`)
        .setDescription(`Je veux un patpat, react avec un :heart:`)
        .setImage('https://static.onecms.io/wp-content/uploads/sites/20/2018/05/21042210_264995290674140_8840525631411191808_n.jpg')

    await message.channel.send({
            embeds : [embed]
        });
};

module.exports.name = 'patpat';