require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

// Configura el webhook
const URL = process.env.VERCEL_URL || 'https://tu-app.vercel.app';
bot.setWebHook(`${URL}/bot${process.env.TELEGRAM_BOT_TOKEN}`);

// Ruta para manejar mensajes del webhook
app.post(`/bot${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Bot activo en modo Webhook');
});
