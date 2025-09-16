import style from "./GameGrid.module.css"
import GameCard from "../GameCard/GameCard"
import { useGamesForNextWeek } from "../../Hooks/useGames.js";
// import { useEffect } from "react";

export default function GameGrid() {
  
  const { data, isPending, error } = useGamesForNextWeek();

    if (isPending) return <p>Loading games...</p>;
    if (error) return <p>Error fetching games: {error.message}</p>;
    console.log(data.results);
    const games = data.results;
    

    return (
      <div className={style["game-grid"]}>
        {games.map((game) => (
          <GameCard
            key={game['id']}
            srcCarousel={game["short_screenshots"].filter((_, index)=> index!==0)} //The first screenshot is the same as the background, so it's been filtered out of the carousel
            backgroundImage={game["background_image"]}
          />
        ))}
      </div>
    );
}