import { useState } from "react";
import video2 from "../../assets/video-2.mp4";
import ReactPlayer from "react-player";
import style from './Hero.module.css';
import mutedIcon from "../../../public/audio-volume-muted-symbolic-svgrepo-com.svg";
import unmutedIcon from "../../../public/unmute-svgrepo-com.svg";

export default function Hero({welcomed}) {

    const [muted, setMuted] = useState(true);
    // const [getNow, setGetNow] = useState(false);
    // const [paused, setPaused] = useState(false);

    function unMute(e){
        if(e.target.matches('video')){
            e.target.muted = false;
            e.target.volume = 1.0;
        }
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

        {/* <ReactPlayer
          className={style.player}
          src={video1}
          playing={true}
          muted
          width="100%"
          height="100%"
          onReady={() => {}}
          onClick={(e) => play(e)}
          onKeyDown={(e) => play(e)}
          onScroll={(e) => play(e)} */}

        <video
          className={style.player}
          autoPlay
          //   controls
          muted={muted}
        >
          <source src={video2} type="video/webm" />
          <source src={video2} type="video/mp4" />
          <p>
            Your browser doesn't support HTML video. Here is a
            <a href={video2} download="myVideo.mp4">
              link to the video
            </a>{" "}
            instead.
          </p>
        </video>

        
        <aside className={[`${style['hero-left']} ${welcomed? style["welcomed"] : ''}`]}>
            <h1> Cyberville </h1>
            <p>
              Your gateway to the ultimate gameverse. Discover, buy, and play the
              newest games the moment they drop, all in one city of pixels.
            </p>
        </aside>
        

        <aside className={style["hero-right"]}>
          {<button className={style.btn}>Get now</button>}
        </aside>
      </section>
    );
}