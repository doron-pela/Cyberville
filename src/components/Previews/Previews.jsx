import {useEffect} from 'react';
import {useGames} from '../../Hooks/useGames.js'
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

  const monthIndex = new Date().getMonth();

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const previews = {key: "release dates", index: 2}; //action category at index 0
  const { data, error, isPending } = useGames(previews, monthIndex+1);

  if (isPending)
    return (
      <div className={style.loader}>
        <ClimbingBoxLoader color={"white"} size={50} />
      </div>
    );

  if (error) return <p>Error fetching games: {error.message}</p>;

  const games = data?.pages.flatMap(page => page.results) ?? [];
  if (!games.length) return <p>No games found.</p>;
  console.log(data);

  const randomIndex1 = getRandomNumber(1, games.length - 1);
  const randomIndex2 = getRandomNumber(1, games.length - 1);
  const randomIndex3 = getRandomNumber(1, games.length - 1);
  const randomIndex4 = getRandomNumber(1, games.length - 1);
  
    return (
      <section className={style["previews-section"]}>
        <h2>Just released</h2>
        <article className={style["previews-grid"]}>
          <div data-aos={'fade-right'} data-aos-delay="0" className={`${style["AOSWrapper"]} ${style["one"]}`}>
            <div className={`${style["preview-item"]} ${style["one"]}`}>
              <GameCard
                className={style["preview-card"]}
                key={games[randomIndex1]['id']}
                srcCarousel={games[randomIndex1]["short_screenshots"]? games[randomIndex1]["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
                backgroundImage={games[randomIndex1]["background_image"]}
              />
            </div>
          </div>
          <div className={`${style["AOSWrapper"]} ${style["two"]}`} data-aos={'fade-left'} data-aos-delay="150">
            <div className={`${style["preview-item"]} ${style["two"]}`}>
              <GameCard 
                className={style["preview-card"]}
                key={games[randomIndex2]['id']}
                srcCarousel={games[randomIndex2]["short_screenshots"]? games[randomIndex2]["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
                backgroundImage={games[randomIndex2]["background_image"]}
              />
            </div>
          </div>
          <div className={`${style["AOSWrapper"]} ${style["three"]}`} data-aos={'fade-left'} data-aos-delay="200">
            <div className={`${style["preview-item"]} ${style["three"]}`}>
              <GameCard
                className={style["preview-card"]}
                key={games[randomIndex3]['id']}
                srcCarousel={games[randomIndex3]["short_screenshots"]? games[randomIndex3]["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
                backgroundImage={games[randomIndex3]["background_image"]}
              />
            </div>
          </div>
          <div className={`${style["AOSWrapper"]} ${style["four"]}`} data-aos={'fade-up'} data-aos-delay={"300"}>
            <div className={`${style["preview-item"]} ${style["four"]}`}>
              <GameCard
                className={style["preview-card"]}
                key={games[randomIndex4]['id']}
                srcCarousel={games[randomIndex4]["short_screenshots"]? games[randomIndex4]["short_screenshots"].filter((_, index)=> index!==0) : null} //The first screenshot is the same as the background, so it's been filtered out of the carousel
                backgroundImage={games[randomIndex4]["background_image"]}
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