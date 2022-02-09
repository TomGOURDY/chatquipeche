// rôle test id : 940638483805003816

const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    await message.delete();
    const embedError = new Discord.MessageEmbed();
    embedError
        .setTitle(`Miaou`)
        .setDescription('Tu dois mentionner un utilisateur !')
        .setImage('https://i.pinimg.com/originals/ac/e9/3c/ace93c234dfef3c6fae56f60f7d55efe.jpg')
    
    if (message.mentions.users.size !== 1){
        await message.channel.send({
            embeds : [embedError]
        });
        return
    }
    const embed = new Discord.MessageEmbed();
    embed
        .setTitle(`Miaou`)
        .setDescription(`Gratte moi le ventre ${message.mentions.users.at(0)}`)
        .setImage('https://static.wamiz.com/images/news/facebook/ventre-chat-fb-5d137c1806913.jpg')

    await message.channel.send({
            embeds : [embed]
        });
};

module.exports.name = 'gratter';