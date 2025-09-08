import style from "./GameGrid.module.css"
import GameCard from "../GameCard/GameCard"

export default function GameGrid() {

    return (
      <div className={style["game-grid"]}>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    );
}