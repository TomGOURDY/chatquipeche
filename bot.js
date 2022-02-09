const clientLoader = require('./src/clientLoader');
const Discord = require('discord.js');
const commandLoader = require('./src/commandLoader');
const mysql =  require('mysql')
require('dotenv').config()
require('colors');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

connection.connect();

const COMMAND_PREFIX = '!';

clientLoader.createClient(['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS'])
  .then(async (client) => {
    await commandLoader.load(client);
    
    client.on('guildMemberAdd', async(member) => {
      console.log('Nouveau membre')
      member.roles.add("940638483805003816")
      
    })

    client.on('messageCreate', async (message) => {
      if (message.author.bot) {
        return
      } else {
        connection.query(`SELECT user_id FROM xp WHERE user_id = ${message.author.id}`, (error, result) => {
          if(error) {
            console.log('Souci de connection avec la db', error)
          } else {
            if (result.length > 0) {
              let userId = result[0].user_id
              connection.query(`SELECT xp_count FROM xp WHERE user_id = '${userId}'`, (error, result) => {
                if(error) {
                  console.log('Souci de connection avec la db - insert', error)
                } else {
                  connection.query(`UPDATE xp SET xp_count = ${result[0].xp_count + 1} WHERE user_id = '${userId}'`)
                  connection.query(`SELECT xp_count FROM xp WHERE user_id = ${userId}`, (error, result) => {
                    let currentXP = result[0].xp_count
                    connection.query(`select xp_level FROM xp WHERE user_id = ${userId}`, (error, result) => {
                      let currentLevel = result[0].xp_level
                      let necessaryXP = currentLevel + 4;
                      if (currentXP == necessaryXP) {
                        connection.query(`UPDATE xp SET xp_count = 0 WHERE user_id = '${userId}'`)
                        connection.query(`SELECT xp_level FROM xp WHERE user_id = ${userId}`, (error, result) => {
                        if(error) {
                          console.log('Souci de connection avec la db - insert', error)
                        } else {
                          connection.query(`UPDATE xp SET xp_level = ${result[0].xp_level + 1} WHERE user_id = '${userId}'`)
                          connection.query(`SELECT xp_level FROM xp WHERE user_id = ${userId}`, (error, result) => {
                            if(error) {
                              console.log(error)
                            } else {
                              currentLevel = result[0].xp_level
                              embedLevelUp = new Discord.MessageEmbed();
                              embedLevelUp
                                .setTitle(`Miaou`)
                                .setDescription(`Bravo ${message.author}, tu es passé au niveau ${currentLevel} !`)
                                .setImage('https://preview.redd.it/7cu5lub5okl21.jpg?auto=webp&s=5ad2cf86d114e14c63cbd7bfc57124f17abbc880')

                              message.channel.send({
                                embeds: [embedLevelUp]
                              })
                            }
                          })
                        }
                        })
                      }
                    })
                  })
                  
                }
              })
            } else {
              connection.query(`INSERT INTO xp (user_id, xp_level) VALUES (${message.author.id}, 0)`, (error, result) => {
                if(error) {
                  console.log('Souci de connection avec la db - insert', error)
                }
              })
            }
            
          }
        });
      }
       
      // Ne pas tenir compte des messages envoyés par les bots, ou qui ne commencent pas par le préfix
      if (message.author.bot || !message.content.startsWith(COMMAND_PREFIX)) return;

      // On découpe le message pour récupérer tous les mots
      const words = message.content.split(' ');

      const commandName = words[0].slice(1); // Le premier mot du message, auquel on retire le préfix
      const arguments = words.slice(1); // Tous les mots suivants sauf le premier

      

      if (client.commands.has(commandName)) {
        // La commande existe, on la lance
        client.commands.get(commandName).run(client, message, arguments);
      } else {
        // La commande n'existe pas, on prévient l'utilisateur
        await message.delete();
        await message.channel.send(`La commande '${commandName}' n'existe pas.`);
      }
    })
  })
