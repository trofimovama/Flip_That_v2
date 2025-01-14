const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

if (!token || !webAppUrl) {
    throw new Error('Environment variables TELEGRAM_BOT_TOKEN and WEB_APP_URL must be set');
}

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Flip That', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Get Started', web_app: { url: webAppUrl } }]
                ]
            }
        });
    }
});
