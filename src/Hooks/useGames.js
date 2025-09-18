import { getGamesForGenre, getGamesForDates, getGamesForMonth, getGamesForPlatform, getGamesForTag } from "../services/Games.js";
import { pastWeekRange, nextWeekRange } from "../utils/dateModule.js";
// import { getPlatforms } from '../utils/Platforms.js'
import {QueryKeys} from '../utils/QueryKeys.js';
import {useQuery} from '@tanstack/react-query'


export function useGames({key, index}, monthIndex){
  return useQuery({
    queryKey: [key, QueryKeys[key][index], monthIndex],
    queryFn: () => {
      if(key==='release dates'&&Array.isArray(QueryKeys[key][index])) return getGamesForMonth(monthIndex);
      if(key==='release dates'&&QueryKeys[key][index]==='Next Week') return getGamesForDates(nextWeekRange);
      if(key==='release dates'&&QueryKeys[key][index]==='Last Week') return getGamesForDates(pastWeekRange);

      if(key==='platforms') return getGamesForPlatform(QueryKeys[key][index][0]);

      if(key==='genres') return getGamesForGenre(QueryKeys[key][index]);
      if(key === "tags") return getGamesForTag(QueryKeys[key][index]);
    },
    staleTime: 1000 * 60 * 60,
  });
}


// export function useGenres(){
//     return useQuery({
//       queryKey: ["genres"],
//       queryFn: () => getGenres(),
//       staleTime: 1000 * 60 * 60,
//     });
// }

// export function useTags(){
//     return useQuery({
//       queryKey: ["tags"],
//       queryFn: () => getTags(),
//       staleTime: 1000 * 60 * 60,
//     });
// }

// export function usePlatforms(){
//     return useQuery({
//       queryKey: ["platforms"],
//       queryFn: () => getPlatforms(),
//       staleTime: 1000 * 60 * 60,
//     });
// }