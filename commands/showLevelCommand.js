const mysql =  require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

connection.connect();

const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    connection.query(`SELECT user_id FROM xp WHERE user_id = ${message.author.id}`, (error, result) => {
        if(error) {
          console.log('Souci de connection avec la db', error)
        } else {
            let showUser = result[0].user_id;
            connection.query(`SELECT xp_count FROM xp WHERE user_id = '${showUser}'`, (error, result) => {
                if(error) {
                    console.log("Impossible d'accéder à l'xp", error)
                } else {
                    let showXP = result[0].xp_count
                    connection.query(`SELECT xp_level FROM xp WHERE user_id = '${showUser}'`, (error, result) => {
                        if(error) {
                            console.log("Impossible d'accéder au niveau", error)
                        } else {
                            let showLevel = result[0].xp_level
                            embedShowLevel = new Discord.MessageEmbed();
                                  embedShowLevel
                                    .setTitle(`Miaou`)
                                    .setDescription(`${message.author}, tu es actuellement au niveau ${showLevel} et tu as ${showXP + 1} points d'expérience ! Continue de parler !`)
                                    .setImage('https://cf.ltkcdn.net/cats/images/orig/259256-2121x1414-happy-cat.jpg')
                            message.channel.send({
                                embeds: [embedShowLevel]
                                })
                        }
                    })
                }
            })
        }
    })
};

module.exports.name = 'showLevel';