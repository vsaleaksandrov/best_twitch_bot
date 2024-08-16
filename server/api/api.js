const { SUMMONER_NAME, RIOT_API_KEY, SUMMONER_ID } =  require("../utility/constants");
const { PLAYER_STAT_TO_CLIENT } =  require("./mapper");

export const getCurrentGame = async function(){
    const responseUser = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${SUMMONER_NAME}/${SUMMONER_ID}?api_key=${RIOT_API_KEY}`)
        .then(res => res.json())

    const PUUID = responseUser.puuid;

    return new Promise((done, reject) => {
        setInterval(async () => {
            try {
                const currentGame = await fetch(`https://euw1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${PUUID}?api_key=${RIOT_API_KEY}`)
                    .then(res => res.json())

                console.log(currentGame)
            } catch (e) {
                console.log(e)
                reject();
            }
        }, 1000);
    });
}