import { useState } from "react";
import ReactPlayer from "react-player";
import style from './Hero.module.css';
import mutedIcon from "../../assets/audio-volume-muted-symbolic-svgrepo-com.svg";
import unmutedIcon from "../../assets/unmute-svgrepo-com.svg";
import nextArrow from "../../assets/arrow-next-small-svgrepo-com.svg";
import prevArrow from "../../assets/arrow-prev-small-svgrepo-com.svg";
import YouTube  from "react-youtube";

// import src2 from './video-1.mp4';

import Video from "../Video/Video.jsx";

export default function Hero({welcomed, setWelcomed}) {

    const [index, setIndex] = useState(0);
    const [muted, setMuted] = useState(true);
    
    const videos = ["https://cyberville-hero-video.sfo3.digitaloceanspaces.com/video-2.mp4"];

    // useEffect(()=>{
    //   async function fetchData(){
    //     const unWrapped = await fetch().then((res) => res.json());
    //     return unWrapped;
    //   }

    //   const data = fetchData();
      
    //   console.log(data);
    // }, [])

    function unMute(e){
        if(e.target.matches('video')){
            e.target.muted = false;
            e.target.volume = 1.0;
        }
    }

    function clearSiteCache(){
      localStorage.clear();
      setWelcomed(true);
    }

    function incrementIndex(){
      index === videos.length-1? setIndex(0) : setIndex((index) => index+1);
    }

    function decrementIndex() {
      index === 0? setIndex(videos.length-1): setIndex((index) => index -1);
    }

    
      console.log(index);

    


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

        <Video key={videos[index]} src={videos[index]} muted={muted} />

        <aside
          className={[
            `${style["hero-left"]} ${welcomed ? style["welcomed"] : ""}`,
          ]}
        >
          <h1> Cyberville </h1>
          <p>
            Your gateway to the ultimate gameverse. Discover, buy, and play the
            newest games the moment they drop, all in one city of pixels.
          </p>

          <button onClick={() => clearSiteCache()} className={style["pulse"]}>
            Clear Site cache
          </button>
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
          {<button className={style.btn}>Get now</button>}
        </aside>
      </section>
    );
}