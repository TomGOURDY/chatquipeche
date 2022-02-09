const { default: axios } = require('axios');
const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
let nftInfo = ""

axios.get('https://api.x.immutable.com/v1/collections/0x83f120283c30c796ebe9216ccaf6718c31213681').then((response) => {
    console.log(response.data)
    nftInfo = response.data
})

module.exports.run = async (client, message, arguments) => {
    const embed = new Discord.MessageEmbed();
    embed
        .setTitle(nftInfo.name)
        .setImage(nftInfo.collection_image_url)
        .setDescription(nftInfo.description)
        .setURL(`https://imxrarity.io/collection/${nftInfo.address}`)

    message.channel.send({
        embeds : [embed]
    })
};

module.exports.name = 'collection';
