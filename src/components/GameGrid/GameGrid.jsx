import style from "./GameGrid.module.css"
import GameCard from "../GameCard/GameCard"
import{ClimbingBoxLoader} from 'react-spinners'
import { useEffect, useRef } from "react";

export default function GameGrid({ data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage }) {

    const loadMoreRef = useRef(null);

    useEffect(() => {
      if (!loadMoreRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage) {
          fetchNextPage(); // trigger tanstack-query to get the next page specified in the return of getNextPageParams (initiate another query for the next page in the response list)
        }
      });

      observer.observe(loadMoreRef.current);

      return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    if (isPending) return (
      <div className={style.loader}>
        <ClimbingBoxLoader color={'white'} size={50}/>
      </div>
    );

    if (error) return <p>Error fetching games: {error.message}</p>;
    const games = data?.pages.flatMap(page => page.results) ?? [];
    

    return (
      <div className={style["game-grid"]}>
        {games.map((game) => (
            <GameCard
              key={game['id']}
              gameData={game}
              srcCarousel={game["short_screenshots"]? game["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
              backgroundImage={game["background_image"]}
            />
          ))
        }

        <div ref={loadMoreRef} className={`${style['loadMoreTrigger']} ${hasNextPage? style['morePages'] : ""}`}>
          {isFetchingNextPage 
          ? 
              <ClimbingBoxLoader color={'white'} size={20}/>
            : 
            hasNextPage ? "Scroll down for more" : "No more results"
          }
        </div>
      </div>
    );
}