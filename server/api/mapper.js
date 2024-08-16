const PLAYER_STAT_TO_CLIENT = (data) => ({
    championName: data.championName.toUpperCase(),
    kda: data.challenges.kda,
    role: data.lane.toUpperCase(),
    name: data.riotIdGameName,
    win: data.win,
    kills: data.kills,
    deaths: data.deaths,
    assists: data.assists,
    minions: data.totalMinionsKilled + data.neutralMinionsKilled,
});

module.exports = PLAYER_STAT_TO_CLIENT;