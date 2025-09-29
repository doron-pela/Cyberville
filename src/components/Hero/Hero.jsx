import { useState, useContext, useEffect} from "react";
import {useScreenshotsForGame, useGameForId} from '../../Hooks/useGames.js'
import ReactPlayer from "react-player";
import style from './Hero.module.css';
import mutedIcon from "../../assets/audio-volume-muted-symbolic-svgrepo-com.svg";
import unmutedIcon from "../../assets/unmute-svgrepo-com.svg";
import githubIcon from "../../assets/github-svgrepo-com.svg";
import nextArrow from "../../assets/arrow-next-small-svgrepo-com.svg";
import prevArrow from "../../assets/arrow-prev-small-svgrepo-com.svg";
import YouTube  from "react-youtube";

import { useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/contexts.js";

import Video from "../Video/Video.jsx";

export default function Hero({welcomed, setWelcomed}) {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const navigate = useNavigate();
  const { setGameFromCollection } = useContext(GameContext);

  const videos = [
    {
      id: "481913",
      name: "Black Myth Wukong",
      link: "https://cyberville-hero-video.sfo3.cdn.digitaloceanspaces.com/Black%20Myth%20Wukong%20Trailer.p4",
    },
    {
      id: "28492",
      name: "Dead Island",
      link: "https://cyberville-hero-video.sfo3.digitaloceanspaces.com/video-2.mp4",
    },
  ];

  // //Comment out this entire block to use cached data
  // const { data: blackMyth } = useGameForId(481913);
  // const { data: BMScreenshots } = useScreenshotsForGame(481913);

  // const { data: deadIsland } = useGameForId(28492);
  // const { data: DIScreenshots } = useScreenshotsForGame(28492);

  // useEffect(() => {
  //   console.log("Raw BMScreenshots:", BMScreenshots?.results);
  //   console.log("Raw DIScreenshots:", DIScreenshots?.results);
  // }, [BMScreenshots, DIScreenshots]);

  // const screenshots1 = BMScreenshots?.results ?? [];
  // const screenshots2 = DIScreenshots?.results ?? [];

  // const blackMythWukongObj = blackMyth? { ...blackMyth, short_screenshots: screenshots1 } : null;
  // const deadIslandObj = deadIsland? { ...deadIsland, short_screenshots: screenshots2 } : null;

  // localStorage.setItem("blackMythWukongObj", JSON.stringify(blackMythWukongObj));
  // localStorage.setItem("deadIslandObj", JSON.stringify(deadIslandObj));




  //uncomment this whole block to use cached fetch
  const blackMythWukongObj = JSON.parse(localStorage.getItem("blackMythWukongObj"));
  const deadIslandObj = JSON.parse(localStorage.getItem("deadIslandObj"));
  console.log("blackMythWukongObj is:", blackMythWukongObj);
  console.log("deadIslandObj is: ", deadIslandObj);



  const gameList = [blackMythWukongObj, deadIslandObj];

  function unMute(e) {
    if (e.target.matches("video")) {
      e.target.muted = false;
      e.target.volume = 1.0;
    }
  }

  function clearSiteCache() {
    localStorage.clear();
    setWelcomed(true);
  }

  function incrementIndex() {
    index === videos.length - 1 ? setIndex(0) : setIndex((index) => index + 1);
  }

  function decrementIndex() {
    index === 0 ? setIndex(videos.length - 1) : setIndex((index) => index - 1);
  }

  function handleClick() {
    setGameFromCollection(gameList[index]); //Sets our current game data in our outletProvider's parent component's state. The context now becomes available to all child components
    localStorage.setItem(`${gameList[index]["id"]}`, JSON.stringify(gameList[index])); //uniquely caches this game's Data with its key as "id"
    navigate(`/${gameList[index]["id"]}`);
  }

  return (
    <section
      className={style.hero}
      onKeyDown={(e) => unMute(e)}
      onScroll={(e) => unMute(e)}
      onClick={(e) => unMute(e)}
    >
      <img
        src={muted ? mutedIcon : unmutedIcon}
        className={style.mutedIcon}
        onClick={() => setMuted(!muted)}
      />

      <Video key={videos[index].id} src={videos[index].link} muted={muted} />

      <aside
        className={[
          `${style["hero-left"]} ${welcomed ? style["welcomed"] : ""}`,
        ]}
      >
        <h1> Cyberville </h1>
        <p className={[`${style["byLine"]}`]}>
          Your gateway to the ultimate gameverse. Discover, explore, and
          catalogue the newest games the moment they drop, all in one city of
          pixels.
        </p>

        <div className={style["buttons"]}>
          <button onClick={() => navigate(`/shop`)} className={`${style.btn} ${style["shop"]}`}>
            <p>To The Shop</p>
          </button>

          <button onClick={() => clearSiteCache()} className={style["pulse"]}>
            Clear Site cache
          </button>
          
          <a href={"https://github.com/doron-pela/"} target={"_blank"} className={[`${style["author"]}`]}>
            <span><img src={githubIcon} alt="github Icon" />By Doron Pela</span>
          </a>
        </div>

      </aside>

      <div className={style["arrows"]}>
        <div
          onClick={() => decrementIndex()}
          className={`${style["arrow"]} ${style["prev"]}`}
        >
          <img src={prevArrow} alt="prev-arrow" />
        </div>

        <div
          onClick={() => incrementIndex()}
          className={`${style["arrow"]} ${style["next"]}`}
        >
          <img src={nextArrow} alt="next-arrow" />
        </div>
      </div>

      <aside className={style["hero-right"]}>
        {
          <button
            onClick={() => handleClick(gameList[index])}
            className={style.btn}
          >
            Get now
          </button>
        }
      </aside>
    </section>
  );
}