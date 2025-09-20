import style from './Video.module.css';


export default function Video({src, muted, handleVideoEnd}){
    return(
        <video
          className={style.player}
          autoPlay
          //   controls
          muted={muted}
          onEnded={handleVideoEnd}
        >
          <source src={src} type="video/webm" />
          <source src={src} type="video/mp4" />
          <p>
            Your browser doesn't support HTML video. Here is a
            <a href={src} download="myVideo.mp4">
              link to the video
            </a>{" "}
            instead.
          </p>
        </video>
    );
}