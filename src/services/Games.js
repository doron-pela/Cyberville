import axios from 'axios'
import { calendarRange, pastWeekRange, nextWeekRange } from '../utils/dateModule.js'
// import { getGenres } from './Genres.js';
import { clientSecret } from './api.js';

const baseUrl = "https://api.rawg.io/api";
const games = '/games';
const page_size = 40;

export const getGamesForPastWeek = async ()=>{
    const results = await axios.get(`${baseUrl}${games}?dates=${pastWeekRange}&page_size=${page_size}&key=${clientSecret}`);
    return results.data;
}

export const getGamesForNextWeek = async ()=>{
    const results = await axios.get(`${baseUrl}${games}?dates=${nextWeekRange}&page_size=${page_size}&key=${clientSecret}`);
    return results.data;
}

export const getGamesForMonth = async (monthIndex)=>{
    const monthRange = calendarRange[monthIndex];
    const results = await axios.get(`${baseUrl}${games}?dates=${monthRange}&page_size=${page_size}&key=${clientSecret}`);
    return results.data;
}

export const getGamesForGenre = async (genre)=>{
    const results = await axios.get(`${baseUrl}${games}?genres=${genre}&page_size=${page_size}&key=${clientSecret}`);
    return results.data;
}

