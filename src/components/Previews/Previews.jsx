import {useEffect} from 'react';
import {useGames, useGameWithVideo} from '../../Hooks/useGames.js'
import style from './Previews.module.css';
import GameCard from '../GameCard/GameCard.jsx';
import { ClimbingBoxLoader } from 'react-spinners';
// import previewImage1 from "./p1.jpg";
// import previewImage2 from "./p2.jpg";
// import previewImage3 from "./p3.jpg";
// import previewImage4 from "./p4.jpg";
import aos from "aos";
import "aos/dist/aos.css";



export default function Previews(){
  useEffect(()=>{
    aos.init({duration: 500});
  },[])

  // //comment this whole block to use cached fetch
  // //get game1
  // const {data: gameWithVideoData} = useGameWithVideo(3498); //Returns the video game gta. Comment this out after it runs for the first time to allow localStorage caching.
  // localStorage.setItem("gameWithVideoData", JSON.stringify(gameWithVideoData)); 

  //uncomment this whole block to use cached fetch
  const gameWithVideoData = JSON.parse(localStorage.getItem("gameWithVideoData"));




  // //comment this whole block to use cached fetch
  // const monthIndex = new Date().getMonth();
  // const previews = {key: "platforms", index: 1}; //action category at index 0
  // const { data: previewsData, error, isPending } = useGames(previews, monthIndex);
  // localStorage.setItem("previewsData", JSON.stringify(previewsData));

  //uncomment this whole block to use cached fetch
  const previewsData = JSON.parse(localStorage.getItem("previewsData"));
  const isPending = false;
  const error = false;

  if (isPending)
    return (
      <div className={style.loader}>
        <ClimbingBoxLoader color={"white"} size={50} />
      </div>
    );
  if (error) return <p>Error fetching games: {error.message}</p>;
  //games: the final games list of size 'n' - 40 in this case
  const games = previewsData?.pages.flatMap(page => page.results) ?? []; //The shape of the response data has .pages (the pages/batches of games returned for each game list. Each page then has a .results containing the list of games)
  if (!games.length) return <p>No games found.</p>;




  
  //get games 2,3 and 4 from games array
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Calculate random index for each game grid item from the games results array
  const randomIndex2 = getRandomNumber(1, games.length - 1);
  const randomIndex3 = getRandomNumber(1, games.length - 1);
  const randomIndex4 = getRandomNumber(1, games.length - 1);





  //Store reference for each game object. 
  const game1 = gameWithVideoData;
  const game2 = games[randomIndex2];
  const game3 = games[randomIndex3];
  const game4 = games[randomIndex4];
  //game object cache setters. Comment/uncomment depending on first fetch
  // localStorage.setItem("game2", game2);
  // localStorage.setItem("game3", game3);
  // localStorage.setItem("game4", game4);
  



    return (
      <section className={style["previews-section"]}>
        <h2>Just released</h2>
        <article className={style["previews-grid"]}>
          <div data-aos={'fade-right'} data-aos-delay="0" className={`${style["AOSWrapper"]} ${style["one"]}`}>
            <div className={`${style["preview-item"]} ${style["one"]}`}>
              <GameCard
                //This card is for the only game with video we can get: GTA V
                gameData={game1}
                key={game1}
                srcCarousel={game1["short_screenshots"]? game1["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
                backgroundImage={game1["background_image"]}
              />
            </div>
          </div>
          <div className={`${style["AOSWrapper"]} ${style["two"]}`} data-aos={'fade-left'} data-aos-delay="150">
            <div className={`${style["preview-item"]} ${style["two"]}`}>
              <GameCard 
                gameData={game2}
                className={style["preview-card"]}
                key={game2['id']}
                srcCarousel={game2["short_screenshots"]? game2["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
                backgroundImage={game2["background_image"]}
              />
            </div>
          </div>
          <div className={`${style["AOSWrapper"]} ${style["three"]}`} data-aos={'fade-left'} data-aos-delay="200">
            <div className={`${style["preview-item"]} ${style["three"]}`}>
              <GameCard
                gameData={game3}
                className={style["preview-card"]}
                key={game3['id']}
                srcCarousel={game3["short_screenshots"]? game3["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
                backgroundImage={game3["background_image"]}
              />
            </div>
          </div>
          <div className={`${style["AOSWrapper"]} ${style["four"]}`} data-aos={'fade-up'} data-aos-delay={"300"}>
            <div className={`${style["preview-item"]} ${style["four"]}`}>
              <GameCard
                gameData={game4}
                className={style["preview-card"]}
                key={game4['id']}
                srcCarousel={game4["short_screenshots"]? game4["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
                backgroundImage={game4["background_image"]}
              />
            </div>
          </div>
          {/* <div data-aos={'fade-left'} data-aos-delay={"200"} className={`${style["preview-item"]} ${style["five"]}`}>
            <img src={previewImage4} alt="" />
          </div>
          <div data-aos={'fade-left'} data-aos-delay={"200"} className={`${style["preview-item"]} ${style["six"]}`}>
            <img src={previewImage4} alt="" />
          </div> */}
        </article>
      </section>
    );
}