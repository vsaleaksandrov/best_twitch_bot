require('dotenv').config();
const tmi = require("tmi.js");

const {
    TOKEN,
    BOT_USER_NAME,
    CHANNEL_NAME,
    SERVER_PORT,
} = process.env;

const SERVER_URI = `http://localhost:${SERVER_PORT}`;

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: BOT_USER_NAME,
        password: `oauth:${TOKEN}`
    },
    channels: [ CHANNEL_NAME ]
});

client.connect();

client.on('message', async (channel, tags, message, self) => {
    if (self || !message.startsWith('!')) return;
    const command = message
        .slice(1)
        .split(' ')
        .shift()
        .toLowerCase();

    switch (command) {
        case "прошлая":
            return fetch(`${SERVER_URI}/api/getLastGame`).then(res => res.json()).then(res => {
                const responseText = `Прошлую игру ${res.win ? "победил" : "проебал"} за ${res.championName} на позиции ${res.individualPosition}. КДА - ${res.kills}/${res.deaths}/${res.assists}. Нафармил - ${res.totalMinionsKilled + res.neutralMinionsKilled} мобов.`
                client.say(channel, responseText);
            });
    }
});
