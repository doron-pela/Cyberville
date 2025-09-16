import axios from 'axios'
import { calendarRange, pastWeekRange, nextWeekRange } from '../utils/dateModule.js'
import { clientSecret } from './api.js';

const baseUrl = "https://api.rawg.io/api";
const games = '/games';

export const getGamesForPastWeek = async ()=>{
    const results = await axios.get(`${baseUrl}${games}?dates=${pastWeekRange}&key=${clientSecret}`);
    return results.data;
}

export const getGamesForNextWeek = async ()=>{
    const results = await axios.get(`${baseUrl}${games}?dates=${nextWeekRange}&key=${clientSecret}`);
    return results.data;
}

export const getGamesForMonth = async (monthIndex)=>{
    const monthRange = calendarRange[monthIndex];
    const results = await axios.get(`${baseUrl}${games}?dates=${monthRange}&key=${clientSecret}`);
    return results.data;
}

