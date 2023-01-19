const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");


dotenv.config();

const bot = new TelegramBot(process.env.TELE_TOKEN, {polling: true});

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
    });

const openai = new OpenAIApi(configuration);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const promt = msg.text;
    console.log(promt); 
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${promt}`,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
      });

      bot.sendMessage(chatId, response.data.choices[0].text.trim());
});

//