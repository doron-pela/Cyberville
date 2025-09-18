import style from "./GameGrid.module.css"
import GameCard from "../GameCard/GameCard"
// import { useEffect } from "react";

export default function GameGrid({ data, isPending, error }) {

    if (isPending) return <p>Loading games...</p>;
    if (error) return <p>Error fetching games: {error.message}</p>;
    const games = data.results;
    console.log(games);
    

    return (
      <div className={style["game-grid"]}>
        {isPending? <p className={style["loading"]}>Loading games...</p> :
          games.map((game) => (
            <GameCard
              key={game['id']}
              srcCarousel={game["short_screenshots"]? game["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
              backgroundImage={game["background_image"]}
            />
          ))
        }
      </div>
    );
}