const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  /**
   * @param {Array} intents
   * @returns {Promise<Discord.Client>}
   */
  createClient: async (intents = []) => {
    if (intents && intents.length > 0 && !intents.includes('GUILD_MESSAGES')) {
      intents = [...intents, 'GUILD_MESSAGES'];
    }

    if (!intents) {
      intents = ['GUILD_MESSAGES']
    }

    const client = new Discord.Client({
      intents: intents
    });

    return client.login(process.env.TOKEN)
        .then(() => {
          console.log(`Le bot est en ligne! Invitez le avec ce lien: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
          return client;
        }).catch((error) => {
          throw error;
      });
  }
};
