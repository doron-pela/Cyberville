import { useState, useContext } from "react";
import { motion } from "motion/react";
import { useScreenshotsForGame, useGameForId } from "../../Hooks/useGames.js";
import ReactPlayer from "react-player";
import style from "./Hero.module.css";
import mutedIcon from "../../assets/audio-volume-muted-symbolic-svgrepo-com.svg";
import unmutedIcon from "../../assets/unmute-svgrepo-com.svg";
import githubIcon from "../../assets/github-svgrepo-com.svg";
import nextArrow from "../../assets/arrow-next-small-svgrepo-com.svg";
import prevArrow from "../../assets/arrow-prev-small-svgrepo-com.svg";
import YouTube from "react-youtube";

import { useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/contexts.js";

import { useQueryClient } from "@tanstack/react-query";

import Video from "../Video/Video.jsx";

export default function Hero({ welcomed, setWelcomed }) {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const navigate = useNavigate();
  const { setGameFromCollection } = useContext(GameContext);
  const queryClient = useQueryClient();

  const videos = [
    {
      id: "28492",
      name: "Dead Island",
      link: "https://cyberville-hero-video.sfo3.digitaloceanspaces.com/video-2.mp4",
    },
    {
      id: "481913",
      name: "Black Myth Wukong",
      link: "https://cyberville-hero-video.sfo3.cdn.digitaloceanspaces.com/Black%20Myth%20Wukong%20Trailer.p4",
    },
  ];

  //Comment out this entire block to use cached data
  const { data: blackMyth } = useGameForId(481913);
  const { data: BMScreenshots } = useScreenshotsForGame(481913);

  const { data: deadIsland } = useGameForId(28492);
  const { data: DIScreenshots } = useScreenshotsForGame(28492);

  // useEffect(() => {
  //   console.log("Raw BMScreenshots:", BMScreenshots?.results);
  //   console.log("Raw DIScreenshots:", DIScreenshots?.results);
  // }, [BMScreenshots, DIScreenshots]);

  const screenshots1 = BMScreenshots?.results ?? [];
  const screenshots2 = DIScreenshots?.results ?? [];

  const blackMythWukongObj = blackMyth
    ? { ...blackMyth, short_screenshots: screenshots1 }
    : null;
  const deadIslandObj = deadIsland
    ? { ...deadIsland, short_screenshots: screenshots2 }
    : null;

  localStorage.setItem(
    "blackMythWukongObj",
    JSON.stringify(blackMythWukongObj),
  );
  localStorage.setItem("deadIslandObj", JSON.stringify(deadIslandObj));

  //uncomment this whole block to use cached fetch
  // const blackMythWukongObj = JSON.parse(localStorage.getItem("blackMythWukongObj"));
  // const deadIslandObj = JSON.parse(localStorage.getItem("deadIslandObj"));
  // console.log("blackMythWukongObj is:", blackMythWukongObj);
  // console.log("deadIslandObj is: ", deadIslandObj);

  const gameList = [deadIslandObj, blackMythWukongObj];

  const titleDuration = 4.5;
  const byLineDelay = titleDuration + 0.35;
  const byLineLineDuration = 1.5;
  const byLineLineStagger = 0.5;
  const buttonsDelay = byLineDelay + 1.5;

  const byLineLines = [
    "The ultimate gameverse catalogue.",
    "Discover, explore, and inventorize the newest",
    "games the moment they drop, all in one city of pixels.",
  ];

  const titleVariants = {
    hidden: {
      x: "-135vw",
    },
    visible: {
      x: 0,
      transition: {
        duration: titleDuration,
        ease: [0.12, 1, 0.22, 1],
      },
    },
  };

  const titleGlassVariants = {
    hidden: {
      "--glass-opacity": 0,
    },
    visible: {
      "--glass-opacity": 1,
      transition: {
        delay: titleDuration,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const byLineVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: byLineDelay,
        staggerChildren: byLineLineStagger,
      },
    },
  };

  const byLineLineVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      "--line-mask": "0%",
    },
    visible: {
      opacity: 1,
      y: 0,
      "--line-mask": "100%",
      transition: {
        opacity: {
          duration: 0.55,
          ease: "easeOut",
        },
        y: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        },
        "--line-mask": {
          duration: byLineLineDuration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
  };

  const buttonsVariants = {
    hidden: {
      "--buttons-glass-opacity": 0,
    },
    visible: {
      "--buttons-glass-opacity": 1,
      transition: {
        "--buttons-glass-opacity": {
          delay: titleDuration,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        },
        delayChildren: buttonsDelay,
        staggerChildren: 0.12,
      },
    },
  };

  const buttonItemVariants = {
    hidden: {
      y: 18,
      opacity: 0,
      filter: "blur(12px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.68,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const mutedIconVariants = {
    hidden: {
      y: 22,
      scale: 0.92,
      opacity: 0,
      filter: "blur(14px)",
    },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.82,
        ease: [0.16, 1, 0.3, 1],
        delay: buttonsDelay + 0.32,
      },
    },
  };

  const arrowsVariants = {
    hidden: {
      y: 24,
      opacity: 0,
      filter: "blur(14px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.82,
        ease: [0.16, 1, 0.3, 1],
        delay: buttonsDelay + 0.44,
      },
    },
  };

  const getNowVariants = {
    hidden: {
      y: 26,
      opacity: 0,
      filter: "blur(14px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: buttonsDelay + 0.56,
      },
    },
  };

  function unMute(e) {
    if (e.target.matches("video")) {
      e.target.muted = false;
      e.target.volume = 1.0;
    }
  }

  function clearSiteCache() {
    localStorage.clear();
    queryClient.clear(); //Clear all the cached queries. All queries now refetch and recache. Since I set Cache time to infinity on all queries, this is a good reset button for memory management.
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
    localStorage.setItem(
      `${gameList[index]["id"]}`,
      JSON.stringify(gameList[index]),
    ); //uniquely caches this game's Data with its key as "id"
    navigate(`/${gameList[index]["id"]}`);
  }

  return (
    <section
      className={style.hero}
      onKeyDown={(e) => unMute(e)}
      onScroll={(e) => unMute(e)}
      onClick={(e) => unMute(e)}
    >
      <motion.img
        src={muted ? mutedIcon : unmutedIcon}
        className={style.mutedIcon}
        onClick={() => setMuted(!muted)}
        variants={mutedIconVariants}
        initial="hidden"
        animate={welcomed ? "visible" : "hidden"}
      />

      <Video key={videos[index].id} src={videos[index].link} muted={muted} />

      <aside
        className={[
          `${style["hero-left"]} ${welcomed ? style["welcomed"] : ""}`,
        ]}
      >
        <motion.div
          className={style["titleGlass"]}
          variants={titleGlassVariants}
          initial="hidden"
          animate={welcomed ? "visible" : "hidden"}
          style={{ "--glass-opacity": 0 }}
        >
          <motion.h1
            className={style.title}
            variants={titleVariants}
            initial="hidden"
            animate={welcomed ? "visible" : "hidden"}
          >
            Cybervylle
          </motion.h1>

          <motion.p
            className={[`${style["byLine"]}`]}
            variants={byLineVariants}
            initial="hidden"
            animate={welcomed ? "visible" : "hidden"}
          >
            {byLineLines.map((line) => (
              <motion.span
                key={line}
                className={style["byLineLine"]}
                variants={byLineLineVariants}
                style={{ "--line-mask": "0%" }}
              >
                {line}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        <motion.div
          className={style["buttons"]}
          variants={buttonsVariants}
          initial="hidden"
          animate={welcomed ? "visible" : "hidden"}
          style={{ "--buttons-glass-opacity": 0 }}
        >
          <motion.a
            href={"https://github.com/doron-pela/"}
            target={"_blank"}
            className={[`${style["author"]}`]}
            variants={buttonItemVariants}
          >
            <span>
              <img src={githubIcon} alt="github Icon" />
              <p>By Doron Pela</p>
            </span>
          </motion.a>

          <motion.div
            className={style["buttonMotionSlot"]}
            variants={buttonItemVariants}
          >
            <button onClick={() => clearSiteCache()} className={style["pulse"]}>
              Clear Site cache
            </button>
          </motion.div>

          <motion.div
            className={style["buttonMotionSlot"]}
            variants={buttonItemVariants}
          >
            <button
              onClick={() => navigate(`/shop`)}
              className={`${style.btn} ${style["shop"]}`}
            >
              Explore!
            </button>
          </motion.div>
        </motion.div>
      </aside>

      <motion.div
        className={style["arrows"]}
        variants={arrowsVariants}
        initial="hidden"
        animate={welcomed ? "visible" : "hidden"}
      >
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
      </motion.div>

      <motion.aside
        className={style["hero-right"]}
        variants={getNowVariants}
        initial="hidden"
        animate={welcomed ? "visible" : "hidden"}
      >
        {
          <button
            onClick={() => handleClick(gameList[index])}
            className={style.btn}
          >
            Get now
          </button>
        }
      </motion.aside>
    </section>
  );
}
