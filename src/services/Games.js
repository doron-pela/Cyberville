import axios from 'axios'
import { calendarRange, pastWeekRange, nextWeekRange } from '../utils/dateModule.js'
// import { getGenres } from './Genres.js';
import { clientSecret } from './api.js';

const baseUrl = "https://api.rawg.io/api";
const games = '/games';
const page_size = 40;

export const getGamesForPastWeek = async (page=1)=>{
    const results = await axios.get(`${baseUrl}${games}?dates=${pastWeekRange}&page_size=${page_size}&page=${page}&key=${clientSecret}`);
    return results.data;
}

export const getGamesForNextWeek = async (page=1)=>{
    const results = await axios.get(`${baseUrl}${games}?dates=${nextWeekRange}&page_size=${page_size}&page=${page}&key=${clientSecret}`);
    return results.data;
}

export const getGamesForMonth = async (monthIndex, page=1)=>{
    const monthRange = calendarRange[monthIndex];
    const results = await axios.get(`${baseUrl}${games}?dates=${monthRange}&page_size=${page_size}&page=${page}&key=${clientSecret}`);
    return results.data;
}

// We import all the ranges into the query hook

//useQuery will by default take key, index, and monthindex (3 args)
//if Querykeys.key at index i is of type array, then return get games by month fetcher

//if key === release dates, then check what key[index] is: 
    //if next Week let arg = nextWeekRange.
    //same for lastWeek
    //if key[index] === through the year, get month index from state var (which will be set by date display) and let arg = calendarRange[monthIndex]

    //return getGamesForDates with arg as query fn

export const getGamesForDates = async (range, page=1)=>{
    const results = await axios.get(`${baseUrl}${games}?dates=${range}&page_size=${page_size}&page=${page}&key=${clientSecret}`);
    return results.data;
}

//if key === genres: 
    //let arg = key[index];
    
    //return getGamesForGenre with arg as query fn

export const getGamesForGenre = async (genre, page=1)=>{
    const results = await axios.get(`${baseUrl}${games}?genres=${genre}&page_size=${page_size}&page=${page}&key=${clientSecret}`);
    return results.data;
}

//if key === tags, then: 
    //let arg = key[index];
    
    //return getGamesForGenre with arg as query fn

export const getGamesForTag = async (tag, page=1)=>{
    const results = await axios.get(`${baseUrl}${games}?tags=${tag}&page_size=${page_size}&page=${page}&key=${clientSecret}`);
    return results.data;
}

//if key === platforms, then: 
    //let arg = index+1;
    
    //return getGamesForPlatform with arg as query fn

export const getGamesForPlatform = async (platformId, page=1)=>{
    const results = await axios.get(`${baseUrl}${games}?parent_platforms=${platformId}&page_size=${page_size}&page=${page}&key=${clientSecret}`);
    return results.data;
}

