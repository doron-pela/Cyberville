import {useState, useRef} from 'react'
import style from "./GameCard.module.css"
// import backgroundImage from './background-image.jpg'
// import screenshot1 from './ss1.jpg'
// import screenshot2 from './ss2.jpg'
// import screenshot3 from './ss3.jpg'
// import screenshot4 from "./ss4.jpg"
// import screenshot5 from "./ss5.jpg"
import Video from '../Video/Video.jsx'

export default function GameCard({srcCarousel, backgroundImage}) {
    const [carouselShowing, setCarouselShowing] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const dotRefs = useRef([]);
    const containerRef = useRef(null);

    
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
        <div className={style["game-card"]}>
            <div onMouseMove={(e)=>showCarousel(e)} onMouseLeave={()=>setCarouselShowing(false)} className={style["image-container"]} ref={containerRef}>
                {carouselShowing && srcCarousel.length>0? //Only showing gallery if there's more than one picture and in the hover state
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
                    (<img className={style['cover-image']} src={backgroundImage} alt="BackgroundImage" />)}
            </div>
            <div className={style["data-container"]}>

            </div>
        </div>
    )
}