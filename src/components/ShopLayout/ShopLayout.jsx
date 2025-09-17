import { useState} from "react";
import styles from "./ShopLayout.module.css";
import GameGrid from "../GameGrid/GameGrid";
import SideBar from '../SideBar/SideBar.jsx';
import { useGamesForPastWeek } from "../../Hooks/useGames.js";
import { QueryKeys } from '../../utils/QueryKeys.js';


export default function ShopLayout() {
  const [isHidden, setIsHidden] = useState(true);
  const [selected, setSelected] = useState(QueryKeys['release dates'][1]);

  const { data, error, isPending } = useGamesForPastWeek();
  // const { data, error, isPending } = useGames(selected);
  // const { data, error, isPending } = useGamesForMonth(3);
  // const { data, error, isPending } = usePlatforms();

  return (
    <main className={styles.container}>
      <section className={`${styles.content} ${!isHidden ? "" : styles.contentExpand}`}>
        <h1 className={styles.title}>{selected}</h1>
        <GameGrid data={data} error={error} isPending={isPending} />
      </section>

      <SideBar selected={selected} setSelected={setSelected} isHidden={isHidden} setIsHidden={setIsHidden} />
    </main>
  );
}
