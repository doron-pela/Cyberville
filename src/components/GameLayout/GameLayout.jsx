import {useEffect, useState, useContext} from 'react'
import { useParams} from "react-router-dom";
import { useGameForId } from "../../Hooks/useGames";
import { GameContext } from '../../contexts/contexts.js';
import style from './GameLayout.module.css'

export default function GameLayout(){
    const {gameId} = useParams();
    const [cached, setCached] = useState(null);
    const {gameFromCollection, setGameFromCollection} = useContext(GameContext);
    const thisGame = gameFromCollection || cached; 

    // console.log("game from collection: ");console.dir(gameFromCollection)
    // console.log("game from cache: ");console.dir(cached)

    useEffect(()=>{
        const item = localStorage.getItem(`${gameId}`);         //Whole block immediately gets data from cache if exists (we set it clicking on the way here)
        const cachedGame = item? JSON.parse(item) : null;

        if(cachedGame){                                 //If we have a cache, set both current local state and current global context to our cache data
            setCached(cachedGame);
            setGameFromCollection(cachedGame);
        }else{                                          //If we don't have a cache, cache our current global context and set current local state to it. One of them will definitely persist through route changes and/or refreshes, if both don't at the same time
            localStorage.setItem(gameFromCollection?.["id"], JSON.stringify(gameFromCollection));
            setCached(JSON.parse(localStorage.getItem(gameFromCollection?.["id"])))
        }
    
        const lastGameVisited = JSON.parse(localStorage.getItem('lastGame')) || null;                            //last game is not set? skip, no problem - gamedata persists in cache. Last game is set? Means route changed before and component unmounted, marking lastgame's id for deletion in new game route
        if (lastGameVisited && lastGameVisited.toString() !== gameId.toString()) {                  //there is a last game (the route changed) and we are on a new game? 
          localStorage.removeItem(lastGameVisited);                     //Deleting the last game visited means we need to click a game card again for this game layout's data to be set
        }

        // console.log("last game visited: "+lastGameVisited)
        // console.log("gameId: "+gameId)

        return ()=>{
            if(!window.location.pathname.includes(`${gameId}`)){ //check if current route changes
                localStorage.setItem('lastGame', gameId);
            } //We check if we are not on this game's route any longer, and 
        }
    }, [gameId])


    //Used localStorage caching and context here for 
    // const {data: game} = useGameForId(gameId);
            
    
    
    return (
        <div className={style.gameDetails}>
            <div className={style.topBar}>
                <div className={style.goBack}>{"<"}</div>
                <h1 className={style.title} >{thisGame?.["name"]}</h1>
            </div>
            <div className={style.container}>
                <div className={style.carouselWindow}>
                    <div className={style.imageCarousel}>
                        {thisGame?.['short_screenshots'].map((screenshot)=>{
                            return <img key={screenshot.id} src={screenshot.image} className={style.image} />
                        })}
                    </div>
                </div>
                <div className={style.details}>
                    <div className={style.top}>
                    </div>
                    <div className={style.bottom}>
                    </div>
                </div>
            </div>
        </div>
    )
}