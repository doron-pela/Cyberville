import { getGamesForGenre, getGamesForDates, getGamesForMonth, getGamesForPlatform, getGamesForTag, getGamesForSearch, getGameForId } from "../services/Games.js";
import { pastWeekRange, nextWeekRange } from "../utils/dateModule.js";
import { getGameWithVideo, getVideosForGame, getScreenshotsForGame } from "../services/Movies.js";
// import { getPlatforms } from '../utils/Platforms.js'
import {QueryKeys} from '../utils/QueryKeys.js';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query'


export function useGames({key, index}, monthIndex){
  return useInfiniteQuery({
    queryKey: [key, QueryKeys[key][index], monthIndex],
    queryFn: ({pageParam=1}) => {
      if(key==='release dates'&&Array.isArray(QueryKeys[key][index])) return getGamesForMonth(monthIndex, pageParam);
      if(key==='release dates'&&QueryKeys[key][index]==='Next Week') return getGamesForDates(nextWeekRange, pageParam);
      if(key==='release dates'&&QueryKeys[key][index]==='Last Week') return getGamesForDates(pastWeekRange, pageParam);

      if(key==='platforms') return getGamesForPlatform(QueryKeys[key][index][0], pageParam);

      if(key==='genres') return getGamesForGenre(QueryKeys[key][index], pageParam);
      if(key === "tags") return getGamesForTag(QueryKeys[key][index], pageParam);
    },
    getNextPageParam: (lastPage) => {       //tanstack query's lastPage here is the response object gotten from the queryFn (containing .next, .prev, .results, and .count)

      //.next, .prev and .results are all props of the api's response (e.g, we use the response's .results in our game grid cause that's the actual game list)
      //that .next prop in rawg's api's response is a url whose page = current_page + 1

      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get("page"); // return the page number for next request. Note :- page and page_size are both query parameters for our response. If page=1, then in our response list, we are on the 1st page of our response list page_size number of games for page 1. If 2, then we are on the second page of our response list... and so on. So page just helps us break our fetch into batches each of page_size
      }                                      // tanstack query's "nextPage" is is whatever we return here in getNextPageParam
      return undefined;
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useGameForId(gameId){
  return useQuery({
    queryKey: ["gameObject", gameId],
    queryFn: () => getGameForId(gameId),
    staleTime: Infinity,
    cacheTime: Infinity, // keep it in cache for 5 mins (or Infinity)
  });
}

export function useGameWithVideo(gameId){
  return useQuery({
    queryKey: ['gameWithVideo', gameId],
    queryFn: () => getGameWithVideo(gameId),
    staleTime: Infinity, 
    cacheTime: Infinity, // keep it in cache for 5 mins (or Infinity)
  });
}

export function useVideosForGame(gameId, enabled) {
  return useQuery({
    queryKey: ["videosForGame", gameId],
    queryFn: () => getVideosForGame(gameId),
    enabled,
    staleTime: Infinity,
    cacheTime: Infinity, // keep it in cache for 5 mins (or Infinity)
  });
}

export function useScreenshotsForGame(gameId) {
  return useQuery({
    queryKey: ["screenshotsForGame", gameId],
    queryFn: () => getScreenshotsForGame(gameId),
    staleTime: Infinity,
    cacheTime: Infinity, // keep it in cache for 5 mins (or Infinity)
  });
}


export function useGameSearch(searchTerm, enabled) {
  return useQuery({
    queryKey: ["searchTerm", searchTerm],
    queryFn: () => getGamesForSearch(searchTerm),
    enabled,
    staleTime: Infinity,
    cacheTime: Infinity, // keep it in cache for 5 mins (or Infinity)
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