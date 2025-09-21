import {useState, useRef} from 'react'
import{useMatch} from 'react-router-dom'
import { useVideosForGame} from '../../Hooks/useGames.js'
import style from "./GameCard.module.css"
import Video from '../Video/Video.jsx'
import CardData from '../CardData/CardData.jsx'
import { ClimbingBoxLoader, ClipLoader } from 'react-spinners'

export default function GameCard({srcCarousel, backgroundImage, gameData=null}) {
    const [carouselShowing, setCarouselShowing] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [vFetchEnabled, setVFetchEnabled] = useState(false);
    const [videoIsEnded, setVideoIsEnded] = useState(false);
    const dotRefs = useRef([]);
    const containerRef = useRef(null);
    const inShop = useMatch('/shop');


    // //comment this block to use chached fetch
    // const {data: videoData, isPending: videoDataPending} = useVideosForGame(3498, vFetchEnabled);
    // videoData? console.log("Video data is cached") && localStorage.setItem("videoData", JSON.stringify(videoData)) : console.log("Could not cache video data");

    //uncomment this block to use cached fetch
    const videoData = JSON.parse(localStorage.getItem("videoData"));
    const videoDataPending = false;



    function handleIsEnded(){
      setVideoIsEnded(true); //The state of video is ended is handled in the video card and used to substitute out the video component if is ended is true. The video component internally sets this on its onEnd event.
    }

    function handleHover() {
      if (!vFetchEnabled&&!inShop&&gameData?.['id']===3498) {
        // console.log("fetch is enabled with hover");
        setVFetchEnabled(true); // only trigger fetch if its not already triggered and if the game id is not GTA 5
        setVideoIsEnded(false); //on hover, if the video ended before, set videoIsEnded to its initial state (false) on the next hover so it an play again
      }
    }

    function handleMouseLeave(){
      setCarouselShowing(false);
      setVFetchEnabled(false);
      setVideoIsEnded(true);
    }

    function showCarousel(e){
        setCarouselShowing(true);

        if(!carouselShowing)return;

        dotRefs.current.forEach((dot, i)=>{
            const rect = dot.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right) {
              setCarouselIndex(i);
            }
        })
    }   

    return( 
        //When we hover the card and the game Data's movie_count>0, this game has a video. Hence, we enable our query fn to with fetch
        <div className={`${style["game-card"]}`}> 
            {
              vFetchEnabled&&videoData?.['count']>0&&videoIsEnded===false? <Video src={videoData?.["results"][0]['data']["max"]} muted={true} handleVideoEnd={handleIsEnded}/>
              : 
              <div className={`${style["image-container"]} ${inShop? style["inShop"] : ""}`} ref={containerRef}
                    onMouseEnter={()=>handleHover()} 
                    onMouseMove={(e)=>showCarousel(e)} 
                    onMouseOut={()=>handleMouseLeave()}
                  > 
                    {vFetchEnabled && videoDataPending && !inShop? (<div className={style.videoLoader}><ClipLoader color={"white"} size={100} /></div>) : null}
                    {carouselShowing && srcCarousel && srcCarousel.length>0? //Only showing gallery if there's more than one picture and in the hover state
                      <>
                          {srcCarousel.map((src, i)=>{
                              return <img key={src.image} src={src.image} className={`${style['screenshot']} ${style[i+1]} ${i===carouselIndex? style['active']: ""}`}/>
                          })}

                          <div className={style["carousel"]}>
                              {srcCarousel.map((src, i)=>{
                                  return (
                                    <div
                                      ref={(el) => (dotRefs.current[i] = el)}
                                      className={`${style["dot"]} ${
                                        style[i + 1]
                                      } ${
                                        i === carouselIndex ? style["active"] : ""
                                      }`}
                                      key={src.id}
                                    ></div>
                                  );
                              })}
                          </div>
                      </>
                    : 
                      (<img className={style['cover-image']} src={backgroundImage} alt="No Images for this game yet" />)}
              </div>
            }
            {inShop && <CardData gameData={gameData}/>}
        </div>
    )
}