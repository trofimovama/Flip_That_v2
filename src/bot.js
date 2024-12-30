require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start') {
    await bot.sendMessage(chatId, 'Learn...', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Flip That', web_app: {url: webAppUrl}}]
        ]
      }
    })
  }
})
