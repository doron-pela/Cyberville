// import axios from 'axios'
// import { clientSecret } from '../services/api.js';

// const baseUrl = "https://api.rawg.io/api";
// const endpoint = '/platforms/lists/parents';

// export const getPlatforms = async ()=>{
//     const results = await axios.get(`${baseUrl}${endpoint}?&key=${clientSecret}`);
//     return results.data;
// }

export const Platforms = [
  [1, "PC"],
  [2, "PlayStation"],
  [3, "Xbox"],
  [4, "iOS"],
  [8, "Android"],
  [5, "Apple Macintosh"],
  [6, "Linux"],
  [7, "Nintendo"],
  [9, "Atari"],
  [10, "Commodore / Amiga"],
  [11, "SEGA"],
  [12, "3DO"],
  [13, "Neo Geo"],
  [14, "Web"],
];

export const getPlatformId = (platform)=>{
    const index = Platforms.findIndex((subArray)=>subArray[1].toLowerCase()===platform.toLowerCase());
    return index+1;
}
