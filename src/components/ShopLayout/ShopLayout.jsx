import { useState, useEffect} from "react";
import { useGames, useGameSearch } from "../../Hooks/useGames.js";
import styles from "./ShopLayout.module.css";
import GameGrid from "../GameGrid/GameGrid";
import SideBar from '../SideBar/SideBar.jsx';
// import { useGames } from "../../Hooks/useGames.js";
import { monthStrings } from "../../utils/dateModule.js";
import { QueryKeys } from '../../utils/QueryKeys.js';

import { SearchContext } from "../../contexts/contexts.js";
import { useContext } from "react";


import {motion} from 'motion/react';
import {pageVariants} from '../../utils/pageVariants.js'




export default function ShopLayout() {
  const [isHidden, setIsHidden] = useState(true);
  const [selected, setSelected] = useState({key:'release dates', index: 2});
  const [monthIndex, setMonthIndex] = useState(8);

  const {searchTerm, searchEnabled, setSearchTerm, setSearchEnabled} = useContext(SearchContext);

  const onCalendarOption = (selected.key === 'release dates' && selected.index===2); //Helper boolean for if we are on our "Year Round" key in sidebar
  const onPlatformOption = selected.key === "platforms";                             //Helper boolean for if we are on our "platforms" key in sidebar

  //comment this entire block to use cached fetch
  // const games = useGames(selected, monthIndex);
  // if(data){
  //  console.log("grid data is cached");
  //  localStorage.setItem("data", JSON.stringify(data))
  // }else{
  //  console.log("Could not cache grid data");
  // }
  // console.log("data is :");
  // console.dir(data);

  
  //uncomment this entire block to use cached fetch
  const data = JSON.parse(localStorage.getItem("data")); //drill data into gamegrid in development mode


  ////comment out this entire block to use cached fetch
  // const searchResults = useGameSearch(searchTerm, searchEnabled);
  // const queryToUse = searchTerm && searchEnabled ? searchResults : games ;

  useEffect(()=>{
    const searchFalse = false;
    const searchEmpty = "";

    return ()=>{
      setSearchEnabled(searchFalse)
      setSearchTerm(searchEmpty)
    }
  }, [])

  return (
    <motion.main className={styles.container} variants={pageVariants} initial={"shopInitial"} animate={"animate"} exit={"exit"} key={'/shop'}>
      <section onClick={()=>setIsHidden(true)} className={`${styles.content} ${!isHidden ? "" : styles.contentExpand}`}>
        <h1 className={styles.title}>{onPlatformOption? QueryKeys[selected.key][selected.index][1] 
                                      : onCalendarOption? QueryKeys[selected.key][selected.index][0] : QueryKeys[selected.key][selected.index]}
        
        {" "}Releases
        </h1>

        {onCalendarOption && 
          <ul className={styles.monthList}>
              {monthStrings.map((string, i)=><li key={string} className={`${styles.month} ${i===monthIndex ? styles.selectedMonth : " "}`} onClick={()=>setMonthIndex(i)}>{string}</li>)}
          </ul>
        }

        <GameGrid 
          data={data} //Comment out below line & uncomment this line to use cached fetch data. 
        // data={queryToUse?.data} error={queryToUse?.error} isPending={queryToUse?.isPending} fetchNextPage={queryToUse?.fetchNextPage} hasNextPage={queryToUse?.hasNextPage} isFetchingNextPage={queryToUse?.isFetchingNextPage} 
        />
      </section>

      <SideBar selected={selected} setSelected={setSelected} isHidden={isHidden} setIsHidden={setIsHidden} />
    </motion.main>
  );
}
