import { useState } from "react";
import ReactPlayer from "react-player";
import style from './Hero.module.css';
import mutedIcon from "../../assets/audio-volume-muted-symbolic-svgrepo-com.svg";
import unmutedIcon from "../../assets/unmute-svgrepo-com.svg";
import YouTube  from "react-youtube";

export default function Hero({welcomed}) {

    const [muted, setMuted] = useState(true);

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

        <video
          className={style.player}
          autoPlay
          //   controls
          muted={muted}
        >
          <source src={"https://cyberville-hero-video.sfo3.digitaloceanspaces.com/video-2.mp4"} type="video/webm" />
          <source src={"https://cyberville-hero-video.sfo3.digitaloceanspaces.com/video-2.mp4"} type="video/mp4" />
          <p>
            Your browser doesn't support HTML video. Here is a
            <a href={"https://cyberville-hero-video.sfo3.digitaloceanspaces.com/video-2.mp4"} download="myVideo.mp4">
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