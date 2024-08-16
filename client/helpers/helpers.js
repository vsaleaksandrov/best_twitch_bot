// Текст роли
export const getRoleText = (role) => {
    const ROLE = new Map([
        ["MIDDLE", "на миду"],
        ["JUNGLE", "в лесу"],
        ["TOP", "на топе"],
        ["BOTTOM", "на адк"],
        ["UTILITY", "на сапе"],
    ])

    return ROLE.get(role);
}

// Текст чемпиона
export const getChampionNameText = (champion) => {
    const CHAMPION_NAME = new Map([
        ["FIZZ", "за Физа"],
        ["NAAFIRI", "за Нафири"],
        ["TALON", "за Талона"],
    ])

    return CHAMPION_NAME.get(champion);
}