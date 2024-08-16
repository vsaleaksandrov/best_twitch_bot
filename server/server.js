require('dotenv').config({ path: "../.env" })

const { MongoClient, ServerApiVersion } = require('mongodb');
const http = require("http");
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const {
  DB_LOGIN,
  DB_PASS,
  SERVER_PORT,
  SUMMONER_NAME,
  SUMMONER_ID,
  RIOT_API_KEY
} = process.env;

// <MONGODB SECTION>
const mongoDbUri = `mongodb+srv://${DB_LOGIN}:${DB_PASS}@cluster0.j9yo8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let dbClient = null;

async function mongoDbStartServer () {
  try {
    const client = new MongoClient(mongoDbUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    return client;
  } catch (error) {
    console.error(error);
  }
}
// </ MONGODB SECTION>


const getDBUsersCollection = async () => {
  const KEGLYA_DB = await dbClient.db("keglya_db");
  return await KEGLYA_DB.collection("users");
}

const getDBBetsCollection = async () => {
  const KEGLYA_DB = await dbClient.db("keglya_db");
  return await KEGLYA_DB.collection("bets");
}

const getLastGameInfo = async (req, res) => {
  try {
    const responseUser = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${SUMMONER_NAME}?api_key=${RIOT_API_KEY}`)
        .then(res => res.json())

    if (responseUser.status && responseUser.status.status_code === 403) {
      throw new Error("RIOT_API_KEY устарел");
    }

    const PUUID = responseUser.puuid;

    const lastGames = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?start=0&count=5&api_key=${RIOT_API_KEY}`)
        .then(res => res.json())

    const lastGameStats = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${lastGames[0]}?api_key=${RIOT_API_KEY}`).then(res => res.json());

    return {
      lastGameStats,
      PUUID,
    }
  } catch (e) {
    console.log(e)
  }
}

app.get('/', async (req, res) => {
  const BETS_COLLECTION = await getDBBetsCollection();
  const bets = await BETS_COLLECTION.find().toArray();

  res.render('home', {
    intro_text: "Таблица участников",
    bets,
  });
})

app.get('/:username', async (req, res) => {
  const USERS_COLLECTION = await getDBUsersCollection();
  const user = await USERS_COLLECTION.find({ name: req.params.userName });

  res.render('user', {
    user,
  });
})

app.get('/api/getLastGame', async (req, res) => {
  try {
    const { lastGameStats, PUUID } = await getLastGameInfo();

    res.send(lastGameStats.info.participants.find(player => {
      return player.puuid === PUUID
    }));
  } catch (e) {
    console.log(e)
  }
})

io.on("connection", async () => {
  console.log('Кидаемся вебсокетами');
})

server.listen(SERVER_PORT,async ()=>{
  await mongoDbStartServer()
      .then(res => {
        dbClient = res
      })
      .catch(console.dir);
})

process.on('SIGTERM', () => {
  server.close((err) => {
    process.exit(err ? 1 : 0);
  });
});