import {monthStrings} from './dateModule.js'

export const QueryKeys = {
    "genres" : ["action","indie","adventure","role-playing-games-rpg","strategy","shooter","casual","simulation","puzzle","arcade","platformer","massively-multiplayer","racing","sports","fighting","family","board-games","card","educational"],
    "release dates" : ["Next Week", "Last Week", ["Through the year", monthStrings]],
    "platforms" : [[1, "PC"],[2, "PlayStation"], [3, "Xbox"], [4, "iOS"], [5, "Apple Macintosh"],[6, "Linux"], [7, "Nintendo"], [8, "Android"], [9, "Atari"], [10, "Commodore / Amiga"], [11, "SEGA"], [12, "3DO"], [13, "Neo Geo"], [14, "Web"],],
    "tags": ['singleplayer', 'steam-achievements', 'multiplayer', 'full-controller-support', 'steam-cloud', 'atmospheric', 'steam-trading-cards', 'great-soundtrack', 'rpg', 'co-op', "mature"]
}