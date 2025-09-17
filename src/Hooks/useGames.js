import { getGamesForMonth, getGamesForNextWeek, getGamesForPastWeek } from "../services/Games.js";
import { today, monthStrings, pastWeekRange, nextWeekRange } from "../utils/dateModule.js";
// import { getGenres } from '../services/Genres.js'
import {useQuery} from '@tanstack/react-query'


export function useGamesForMonth(monthIndex){
    return useQuery({
      queryKey: ["games", monthIndex, monthStrings[monthIndex], today.getFullYear()],
      queryFn: () => getGamesForMonth(monthIndex),
      staleTime: 1000 * 60 * 60,
    });
}

export function useGamesForPastWeek(){
    return useQuery({
      queryKey: ["games", pastWeekRange], //Keys for caching the requests I've already made, to prevent unnecessary re-querying
      queryFn: () => getGamesForPastWeek(),
      staleTime: 1000 * 60 * 60,
    });
}

export function useGamesForNextWeek(){
    return useQuery({
      queryKey: ["games", nextWeekRange],
      queryFn: () => getGamesForNextWeek(),
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