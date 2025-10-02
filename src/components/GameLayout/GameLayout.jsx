import {useEffect, useState, useContext, useRef} from 'react'
import { useNavigate, useParams} from "react-router-dom";
import { useGameForId } from "../../Hooks/useGames";
import { CartContext, GameContext } from '../../contexts/contexts.js';
import ImageCarousel from '../ImageCarousel/ImageCarousel.jsx'
import backIcon from "../../assets/go-back-svgrepo-com.svg";
import checkMark from '../../assets/checkmark-circle-svgrepo-com.svg'
import scrollUpIcon from "../../assets/scroll-up-svgrepo-com.svg"
import addIcon from "../../assets/add-to-queue-svgrepo-com.svg"
import Reviews from '../Reviews/Reviews.jsx'
import style from './GameLayout.module.css'

import {AnimatePresence, motion} from 'motion/react';
import { pageVariants } from "../../utils/pageVariants.js"

import {stringParse} from '../../utils/stringParse.js'

export default function GameLayout(){
    const {gameId} = useParams();
    const [cached, setCached] = useState(null);
    const {addToCart, isInCart, removeFromCart} = useContext(CartContext)
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

  const description = stringParse(`Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.\n\nEspañol\nRockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización.\nNarración simultánea desde tres perspectivas únicas:\nSigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir.\nGTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.`);

  const developers = [
    {
      id: 3524,
      name: "Rockstar North",
      slug: "rockstar-north",
      games_count: 29,
      image_background:
        "https://media.rawg.io/media/screenshots/43b/43b00286439d859eaea32b8e269b83f9.jpg",
    },
    {
      id: 10,
      name: "Rockstar Games",
      slug: "rockstar-games",
      games_count: 26,
      image_background:
        "https://media.rawg.io/media/screenshots/a95/a95c031fe96063cc40ad377fd828d9ad.jpg",
    },
  ];
  const released = "2013-09-17";
  const tags = [
    {
      "id": 31,
      "name": "Singleplayer",
      "slug": "singleplayer",
      "language": "eng",
      "games_count": 246718,
      "image_background": "https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg"
    },
    {
      "id": 40847,
      "name": "Steam Achievements",
      "slug": "steam-achievements",
      "language": "eng",
      "games_count": 49408,
      "image_background": "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg"
    },
    {
      "id": 7,
      "name": "Multiplayer",
      "slug": "multiplayer",
      "language": "eng",
      "games_count": 41869,
      "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
    },
    {
      "id": 40836,
      "name": "Full controller support",
      "slug": "full-controller-support",
      "language": "eng",
      "games_count": 23151,
      "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
    },
    {
      "id": 13,
      "name": "Atmospheric",
      "slug": "atmospheric",
      "language": "eng",
      "games_count": 38655,
      "image_background": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg"
    },
    {
      "id": 42,
      "name": "Great Soundtrack",
      "slug": "great-soundtrack",
      "language": "eng",
      "games_count": 3438,
      "image_background": "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg"
    },
    {
      "id": 24,
      "name": "RPG",
      "slug": "rpg",
      "language": "eng",
      "games_count": 25767,
      "image_background": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg"
    },
    {
      "id": 18,
      "name": "Co-op",
      "slug": "co-op",
      "language": "eng",
      "games_count": 13959,
      "image_background": "https://media.rawg.io/media/games/c6b/c6bfece1daf8d06bc0a60632ac78e5bf.jpg"
    },
    {
      "id": 36,
      "name": "Open World",
      "slug": "open-world",
      "language": "eng",
      "games_count": 9005,
      "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
    },
    {
      "id": 411,
      "name": "cooperative",
      "slug": "cooperative",
      "language": "eng",
      "games_count": 6349,
      "image_background": "https://media.rawg.io/media/games/530/5302dd22a190e664531236ca724e8726.jpg"
    },
    {
      "id": 8,
      "name": "First-Person",
      "slug": "first-person",
      "language": "eng",
      "games_count": 36475,
      "image_background": "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg"
    },
    {
      "id": 149,
      "name": "Third Person",
      "slug": "third-person",
      "language": "eng",
      "games_count": 14250,
      "image_background": "https://media.rawg.io/media/games/62c/62c7c8b28a27b83680b22fb9d33fc619.jpg"
    },
    {
      "id": 4,
      "name": "Funny",
      "slug": "funny",
      "language": "eng",
      "games_count": 28224,
      "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
    },
    {
      "id": 37,
      "name": "Sandbox",
      "slug": "sandbox",
      "language": "eng",
      "games_count": 8271,
      "image_background": "https://media.rawg.io/media/games/48e/48e63bbddeddbe9ba81942772b156664.jpg"
    },
    {
      "id": 123,
      "name": "Comedy",
      "slug": "comedy",
      "language": "eng",
      "games_count": 14471,
      "image_background": "https://media.rawg.io/media/games/a3c/a3c529a12c896c0ef02db5b4741de2ba.jpg"
    },
    {
      "id": 150,
      "name": "Third-Person Shooter",
      "slug": "third-person-shooter",
      "language": "eng",
      "games_count": 4074,
      "image_background": "https://media.rawg.io/media/games/5bb/5bb55ccb8205aadbb6a144cf6d8963f1.jpg"
    },
    {
      "id": 62,
      "name": "Moddable",
      "slug": "moddable",
      "language": "eng",
      "games_count": 1102,
      "image_background": "https://media.rawg.io/media/games/48e/48e63bbddeddbe9ba81942772b156664.jpg"
    },
    {
      "id": 144,
      "name": "Crime",
      "slug": "crime",
      "language": "eng",
      "games_count": 3205,
      "image_background": "https://media.rawg.io/media/games/f52/f52cf6ba08089cd5f1a9c8f7fcc93d1f.jpg"
    },
    {
      "id": 62349,
      "name": "vr mod",
      "slug": "vr-mod",
      "language": "eng",
      "games_count": 17,
      "image_background": "https://media.rawg.io/media/screenshots/1bb/1bb3f78f0fe43b5d5ca2f3da5b638840.jpg"
    }
  ]

  const stores  = [
    {
      "id": 290376,
      "url": "",
      "store": {
        "id": 1,
        "name": "Steam",
        "slug": "steam",
        "domain": "store.steampowered.com",
        "games_count": 118897,
        "image_background": "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg"
      }
    },
    {
      "id": 290375,
      "url": "",
      "store": {
        "id": 3,
        "name": "PlayStation Store",
        "slug": "playstation-store",
        "domain": "store.playstation.com",
        "games_count": 8059,
        "image_background": "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg"
      }
    },
    {
      "id": 438095,
      "url": "",
      "store": {
        "id": 11,
        "name": "Epic Games",
        "slug": "epic-games",
        "domain": "epicgames.com",
        "games_count": 1418,
        "image_background": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
      }
    },
    {
      "id": 290377,
      "url": "",
      "store": {
        "id": 7,
        "name": "Xbox 360 Store",
        "slug": "xbox360",
        "domain": "marketplace.xbox.com",
        "games_count": 1915,
        "image_background": "https://media.rawg.io/media/games/995/9951d9d55323d08967640f7b9ab3e342.jpg"
      }
    },
    {
      "id": 290378,
      "url": "",
      "store": {
        "id": 2,
        "name": "Xbox Store",
        "slug": "xbox-store",
        "domain": "microsoft.com",
        "games_count": 4929,
        "image_background": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
      }
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
                <h2>Overview</h2>
                <p>
                  {description}
                </p>
                <p className={style.developers}>
                  Developers:{" "}
                  {developers.map((dev, i)=> `${dev["name"]}${i!==developers.length-1? ", " : ""}`)}
                </p>
                <p>
                  Release Date: {" "}{released}
                </p>
                <p className={style.tags}>
                  Tags:{" "}
                  {tags.map((tag, i)=> `${tag["name"]}${i!==tags.length-1? ", " : ""}`)}
                </p>
                <p className={style.stores}>
                  Stores:{" "}
                  {stores.map((st, i)=> `${st["store"]["name"]}${i!==stores.length-1? ", " : ""}`)}
                </p>
              </div>
              <div className={style.bottom}>
                
                <div className={style.scrollUpContainer}>
                  <img src={scrollUpIcon} className={style.scrollUpIcon} alt="scroll up icon" /><span>Scroll up for ratings</span>
                </div>
                {isInCart(thisGame)?
                <motion.span 
                      initial={{scale : .2}}
                      animate={{scale : 1}}
                      className={style.savedContainer}
                      >Saved <img src={checkMark}/>
                </motion.span>
                :
                <div onClick={()=>addToCart(thisGame)} className={style.wishListContainer}>
                  <span>Save To Wishlist</span><img src={addIcon} className={style.addIcon} alt="scroll up icon" />
                </div>}
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