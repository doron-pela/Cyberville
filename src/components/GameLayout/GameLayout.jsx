import {useEffect, useState, useContext, useRef} from 'react'
import { useNavigate, useParams} from "react-router-dom";
import { useGameForId } from "../../Hooks/useGames";
import { GameContext } from '../../contexts/contexts.js';
import ImageCarousel from '../ImageCarousel/ImageCarousel.jsx'
import backIcon from "../../assets/go-back-svgrepo-com.svg";
import Reviews from '../Reviews/Reviews.jsx'
import style from './GameLayout.module.css'

import {AnimatePresence, motion} from 'motion/react';
import { pageVariants } from "../../utils/pageVariants.js"

export default function GameLayout(){
    const {gameId} = useParams();
    const [cached, setCached] = useState(null);
    const {gameFromCollection, setGameFromCollection} = useContext(GameContext);
    const thisGame = cached || gameFromCollection;                  //We will either use the game in the global context, or the game in the cache. 

    const reviewRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [fixed, setFixed] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
      window.scrollTo(0, 0);

      const observer = new IntersectionObserver(
        ([entry]) => {
          const ratio = entry.intersectionRatio;
          setProgress(ratio);

          if (ratio >= 1) setFixed(true);
          else setFixed(false);
        },
        {
          root: document.querySelector(".gameDetails"),
          rootMargin: "0% 0% -30% 0%",
          threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        }
      );

      if (reviewRef.current) observer.observe(reviewRef.current);
      return () => observer.disconnect();
    }, [gameId]);

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


    ////Uncomment this block to use cached fetch 
    // const {data: fetchedGame} = useGameForId(gameId);

    const dummyRedditUrl = "https://www.reddit.com/r/GrandTheftAutoV/";
    const dummyMetaCritic= [
    {
      "metascore": 96,
      "url": "https://www.metacritic.com/game/pc/grand-theft-auto-v",
      "platform": {
        "platform": 4,
        "name": "PC",
        "slug": "pc"
      }
    },
    {
      "metascore": 97,
      "url": "https://www.metacritic.com/game/playstation-3/grand-theft-auto-v",
      "platform": {
        "platform": 16,
        "name": "PlayStation 3",
        "slug": "playstation3"
      }
    },
    {
      "metascore": 97,
      "url": "https://www.metacritic.com/game/playstation-4/grand-theft-auto-v",
      "platform": {
        "platform": 18,
        "name": "PlayStation 4",
        "slug": "playstation4"
      }
    },
    {
      "metascore": 96,
      "url": "https://www.metacritic.com/game/pc/grand-theft-auto-v",
      "platform": {
        "platform": 4,
        "name": "PC",
        "slug": "pc"
      }
    },
    {
      "metascore": 97,
      "url": "https://www.metacritic.com/game/playstation-3/grand-theft-auto-v",
      "platform": {
        "platform": 16,
        "name": "PlayStation 3",
        "slug": "playstation3"
      }
    },
    {
      "metascore": 97,
      "url": "https://www.metacritic.com/game/playstation-4/grand-theft-auto-v",
      "platform": {
        "platform": 18,
        "name": "PlayStation 4",
        "slug": "playstation4"
      }
    }
  ];
  const ratings = [
    {
      "id": 5,
      "title": "exceptional",
      "count": 4328,
      "percent": 59.02
    },
    {
      "id": 4,
      "title": "recommended",
      "count": 2397,
      "percent": 32.69
    },
    {
      "id": 3,
      "title": "meh",
      "count": 466,
      "percent": 6.35
    },
    {
      "id": 1,
      "title": "skip",
      "count": 142,
      "percent": 1.94
    }
  ]

    const backgroundStyle = {
      filter: `blur(${progress * 10}px)`,
    };

    function handleBack(){
      navigate('/shop');
    }
            
   function scrollUp() {
     window.scrollTo({ top: 0, behavior: "smooth" });
   }

   function handleBackgroundClick(e) {
     // If reviews are showing AND click is outside the reviews box
     if (reviewRef.current && !reviewRef.current.contains(e.target)) {
       scrollUp();
     }
   }

    return (
      <motion.div className={style.gameDetails} variants={pageVariants} initial={"initial"} animate={"animate"} exit={"exit"} key={gameId}>
        <div onClick={(e)=>handleBackgroundClick(e)} style={backgroundStyle} className={style.detailsContainer}>
          <div className={style.topBar}>
            <div onClick={()=>handleBack()} className={style.goBack}>
              <img src={backIcon} />
            </div>
            <h1 className={style.title}>{thisGame?.["name"]}</h1>
          </div>
          <div className={style.lowerContainer}>
            {thisGame?.["short_screenshots"] ? (
              <ImageCarousel screenshots={thisGame?.["short_screenshots"]} />
            ) : null}

            <div className={style.details}>
              <div className={style.top}>
                <h2>Title of game</h2>
                <p>uerhgoerihfioerhir4hvuiprhv eroviuh ervherv ervheriuv erverhv rh vrehv iuervhiuer veirh veriuvereverivuh ev eruvier ver eruvier
                  voeuhr vuerh viuerh vehrvuierhvuireh vuieg eh vuierhvuhruvheriuv hehv erhviuer ver veuvh feuvh fiuvh feiuvh eiuhv fevi efvh efiuvh euiv efverv
                  erv eihv iuerv iuergv iurevh eruivge ruigveuivh eiurgveriuvh efiugv riv eruvierverv e ervrev erv er
                  ver vherv uerihv ieruh viuerh vuerh ivurheiuhefiuheiuvger vergvevuerhveriu vheiuhvieufvheiruviurhvisheriuvgeiluvheiuveg iuvh eriov erh virue viuerh vuiegveiuhv eiuv herugver 
                  ervui erivileruvh erigvhrehgtehtehrjejhew wejdjoesjnt enr jb eklb wvefmenhave teo o be omrbtijng else in porderofornteh rest orot upiclk kup ton ehat
                  his tbeing said.
                  ver vherv uerihv ieruh viuerh vuerh ivurheiuhefiuheiuvger vergvevuerhveriu vheiuhvieufvheiruviurhvisheriuvgeiluvheiuveg iuvh eriov erh virue viuerh vuiegveiuhv eiuv herugver 
                  ervui erivileruvh erigvhrehgtehtehrjejhew wejdjoesjnt enr jb eklb wvefmenhave teo o be omrbtijng else in porderofornteh rest orot upiclk kup ton ehat
                  his tbeing said.
                </p>
              </div>
              <div className={style.bottom}>

              </div>
            </div>

          </div>
        </div>

        <div ref={reviewRef} className={style.reviewAnchor}>
          <Reviews
          // fetchedGame?.["metacritic_platforms"]||
          //fetchedGame?.["reddit_url"]||
          // fetchedGame?.["ratings"]||
            metacriticPlatforms={dummyMetaCritic}
            redditUrl={dummyRedditUrl}
            ratings={ratings}
            progress={progress}
            fixed={fixed}
          />
        </div>

        <div style={{ height: "70vh" }} />
      </motion.div>
    );
}