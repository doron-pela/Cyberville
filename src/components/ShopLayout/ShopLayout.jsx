import { useState} from "react";
import styles from "./ShopLayout.module.css";
import GameGrid from "../GameGrid/GameGrid";
import SideBar from '../SideBar/SideBar.jsx';
import { useGamesForPastWeek } from "../../Hooks/useGames.js";


export default function ShopLayout() {
  const [isHidden, setIsHidden] = useState(true);

  // const { data, error, isPending } = useGamesForNextWeek();
  const { data, error, isPending } = useGamesForPastWeek();
  // const { data, error, isPending } = useGamesForMonth(3);

  return (
    <main className={styles.container}>
      <section className={`${styles.content} ${!isHidden ? "" : styles.contentExpand}`}>
        <GameGrid data={data} error={error} isPending={isPending} />
      </section>

      <SideBar isHidden={isHidden} setIsHidden={setIsHidden} />
    </main>
  );
}
