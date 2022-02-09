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
        .setDescription(`J'ai mangé ton message ${message.author}`)
        .setImage('https://www.webbox.co.uk/wp-content/uploads/2021/01/shutterstock_600977711.jpg')

    await message.channel.send({
        embeds : [embed]
    });
};

module.exports.name = 'manger';