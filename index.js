require('dotenv').config();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const clashApi = axios.create({
  baseURL: 'https://cocproxy.royaleapi.dev/v1',
  headers: {
    Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`
  }
});

// Comando para obtener información sobre un clan
bot.onText(/\/clan (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const clanTag = encodeURIComponent(match[1]);

  try {
    const response = await clashApi.get(`/clans/%23${clanTag}`);
    const clan = response.data;

    const message = `
🏰 Clan -> ${clan.name}
🏆 Trophies -> ${clan.clanPoints}
👥 Members -> ${clan.members}
🌍 Location -> ${clan.location ? clan.location.name : 'N/A'}
📊 Level -> ${clan.clanLevel}
    `;
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, '❌ Error: No se pudo obtener información del clan.');
  }
});

console.log('🤖 Bot de Telegram activo');
