import { useState, useRef, useContext } from "react";
import { useVideosForGame } from "../../Hooks/useGames.js";
import { useMatch, useNavigate } from "react-router-dom";
import style from "./GameCard.module.css";
import Video from "../Video/Video.jsx";
import CardData from "../CardData/CardData.jsx";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";
import { GameContext } from "../../contexts/contexts.js";

export default function GameCard({
  srcCarousel,
  backgroundImage,
  gameData = null,
}) {
  const [carouselShowing, setCarouselShowing] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [vFetchEnabled, setVFetchEnabled] = useState(false);
  const [videoIsEnded, setVideoIsEnded] = useState(false);
  const dotRefs = useRef([]);
  const containerRef = useRef(null);
  const inShop = useMatch("/shop");
  const navigate = useNavigate();
  const { setGameFromCollection } = useContext(GameContext) || {};

  //comment this block to use chached fetch
  const { data: videoData, isPending: videoDataPending } = useVideosForGame(
    3498,
    vFetchEnabled,
  );
  // videoData? console.log("Video data is cached") && localStorage.setItem("videoData", JSON.stringify(videoData)) : console.log("Could not cache video data");

  // //uncomment this block to use cached fetch
  // const videoData = JSON.parse(localStorage.getItem("videoData"));
  // const videoDataPending = false;

  function handleIsEnded() {
    setVideoIsEnded(true); //The state of video is ended is handled in the video card and used to substitute out the video component if is ended is true. The video component internally sets this on its onEnd event.
  }

  function handleHover() {
    if (!vFetchEnabled && !inShop && gameData?.["id"] === 3498) {
      // console.log("fetch is enabled with hover");
      setVFetchEnabled(true); // only trigger fetch if its not already triggered and if the game id is not GTA 5
      setVideoIsEnded(false); //on hover, if the video ended before, set videoIsEnded to its initial state (false) on the next hover so it an play again
    }
  }

  function handleMouseLeave() {
    setCarouselShowing(false);
    setVFetchEnabled(false);
    setVideoIsEnded(true);
  }

  function showCarousel(e) {
    setCarouselShowing(true);

    if (!carouselShowing) return;
    if (!e || typeof e.clientX !== "number") return;

    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;

      const rect = dot.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right) {
        setCarouselIndex(i);
      }
    });
  }

  function toGamePage(game) {
    if (!game || typeof game !== "object" || game["id"] == null) return;

    if (typeof setGameFromCollection === "function") {
      setGameFromCollection(game); //Sets our current game data in our outletProvider's parent component's state. The context now becomes available to all child components
    }

    if (gameData && typeof gameData === "object" && gameData["id"] != null) {
      try {
        localStorage.setItem(`${gameData["id"]}`, JSON.stringify(gameData)); //uniquely caches this game's Data with its key as "id"
      } catch (error) {
        console.error("Could not cache game data:", error);
      }
    }

    navigate(`/${game["id"]}`);
  }

  const validSrcCarousel = Array.isArray(srcCarousel)
    ? srcCarousel.filter(
        (src) =>
          src &&
          typeof src === "object" &&
          typeof src.image === "string" &&
          src.image.length > 0,
      )
    : [];

  const possibleVideoSrc = videoData?.["results"]?.[1]?.["data"]?.["max"];
  const videoSrc =
    typeof possibleVideoSrc === "string" && possibleVideoSrc.length > 0
      ? possibleVideoSrc
      : null;

  return (
    //When we hover the card and the game Data's movie_count>0, this game has a video. Hence, we enable our query fn to with fetch
    <div className={`${style["game-card"]}`}>
      {vFetchEnabled &&
      videoData?.["count"] > 0 &&
      videoSrc &&
      videoIsEnded === false ? (
        <Video src={videoSrc} muted={true} handleVideoEnd={handleIsEnded} />
      ) : (
        <div
          onClick={() => toGamePage(gameData)}
          className={`${style["image-container"]} ${inShop ? style["inShop"] : ""}`}
          ref={containerRef}
          onMouseEnter={() => handleHover()}
          onMouseMove={(e) => showCarousel(e)}
          onMouseOut={() => handleMouseLeave()}
        >
          {vFetchEnabled && videoDataPending && !inShop ? (
            <div className={style.videoLoader}>
              <ClipLoader color={"white"} size={100} />
            </div>
          ) : null}
          {carouselShowing && validSrcCarousel.length > 0 ? ( //Only showing gallery if there's more than one picture and in the hover state
            <>
              {validSrcCarousel.map((src, i) => {
                return (
                  <img
                    key={src.id ?? src.image ?? `screenshot-${i}`}
                    src={src.image}
                    className={`${style["screenshot"]} ${style[i + 1]} ${i === carouselIndex ? style["active"] : ""}`}
                  />
                );
              })}

              <div className={style["carousel"]}>
                {validSrcCarousel.map((src, i) => {
                  return (
                    <div
                      ref={(el) => (dotRefs.current[i] = el)}
                      className={`${style["dot"]} ${style[i + 1]} ${
                        i === carouselIndex ? style["active"] : ""
                      }`}
                      key={src.id ?? src.image ?? `dot-${i}`}
                    ></div>
                  );
                })}
              </div>
            </>
          ) : (
            <img
              className={style["cover-image"]}
              src={typeof backgroundImage === "string" ? backgroundImage : ""}
              alt="No Images for this game yet"
            />
          )}
        </div>
      )}
      {inShop && gameData && typeof gameData === "object" && (
        <CardData toGamePage={toGamePage} gameData={gameData} />
      )}
    </div>
  );
}
