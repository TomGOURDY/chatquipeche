const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
  const channel = message.channel;

  const embed = new Discord.MessageEmbed();
  embed
    .setTitle(`Miaou`)
    .setDescription('Prêt à jouer ! :smile_cat:')
    .setImage('https://www.15heures.com/wp-content/uploads/2014/07/12animaux-sourire-3.jpg')

  await message.delete();
  await channel.send({
    embeds : [embed]
});
};

module.exports.name = 'test';
