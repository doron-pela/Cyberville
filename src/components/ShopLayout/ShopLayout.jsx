import { useState} from "react";
import styles from "./ShopLayout.module.css";
import GameGrid from "../GameGrid/GameGrid";
import SideBar from '../SideBar/SideBar.jsx';
import { useGames } from "../../Hooks/useGames.js";
import { monthStrings } from "../../utils/dateModule.js";
import { QueryKeys } from '../../utils/QueryKeys.js';


export default function ShopLayout() {
  const [isHidden, setIsHidden] = useState(true);
  const [selected, setSelected] = useState({key:'release dates', index: 1});
  const [monthIndex, setMonthIndex] = useState(1);

  const onCalendarOption = (selected.key === 'release dates' && selected.index===2); //Helper boolean for if we are on our "Through the year" key in sidebar
  const onPlatformOption = selected.key === "platforms";                             //Helper boolean for if we are on our "platforms" key in sidebar

  const { data, error, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useGames(selected, monthIndex);

  return (
    <main className={styles.container}>
      <section onClick={()=>setIsHidden(true)} className={`${styles.content} ${!isHidden ? "" : styles.contentExpand}`}>
        <h1 className={styles.title}>{onPlatformOption? QueryKeys[selected.key][selected.index][1] 
                                      : onCalendarOption? QueryKeys[selected.key][selected.index][0] : QueryKeys[selected.key][selected.index]}
        </h1>

        {onCalendarOption && 
          <ul className={styles.monthList}>
            {monthStrings.map((string, i)=><li onClick={()=>setMonthIndex(i)}>{string}</li>)}
          </ul>
        }

        <GameGrid data={data} error={error} isPending={isPending} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
      </section>

      <SideBar selected={selected} setSelected={setSelected} isHidden={isHidden} setIsHidden={setIsHidden} />
    </main>
  );
}
