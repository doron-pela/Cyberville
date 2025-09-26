import style from './ImageCarousel.module.css'
import {useState, useEffect, useRef} from 'react';
import prevArrow from "../../assets/arrow-prev-small-svgrepo-com.svg";
import nextArrow from "../../assets/arrow-next-small-svgrepo-com.svg";

export default function ImageCarousel({screenshots}){
    const [index, setIndex] = useState(0);
    // const [translateX, setTranslateX] = useState(0);
    // const [startX, setStartX] = useState(0);
    // const [isDraggable, setIsDraggable] = useState(false);
    // const windowSize = useRef(null);

    // useEffect(()=>{
    //     console.log(translateX);
    //     console.log(startX);
    //     console.log("index is: "+ index)
    // },[translateX, startX])

    // function handleMouseLeave(e){
    //     setTranslateX(e.clientX - startX);
    //     dragEnd();
    // }

    // function handleDrag(e){
    //     if(isDraggable){
    //         setTranslateX(e.clientX - startX);
    //     }
    // }

    // function dragEnd(){
    //     if(translateX>0 && translateX>=(windowSize*1/2)){
    //         incrementIndex();
    //     }
    //     if(translateX<0 && -translateX>=(windowSize*1/2)){
    //         decrementIndex()
    //     }
    //     setIsDraggable(false); 
    //     setStartX(0);
    //     setTranslateX(0);
    // }

    function incrementIndex() {
      index === screenshots.length - 1
        ? setIndex(0)
        : setIndex((index) => index + 1);
    }

    function decrementIndex() {
      index === 0
        ? setIndex(screenshots.length - 1)
        : setIndex((index) => index - 1);
    }

    return (
        <div className={style.carouselWindow}>
            <div onClick={() => decrementIndex()} className={`${style["arrow"]} ${style["prev"]}`} >
                <img src={prevArrow} alt="prev-arrow" />
            </div>
            
            <div onClick={() => incrementIndex()} className={`${style["arrow"]} ${style["next"]}`} >
                <img src={nextArrow} alt="next-arrow" />
            </div>

            <div style={{transform: `translateX(calc(calc(-${index}*100%)`}} className={style.imageCarousel}>

                {screenshots?.map((screenshot)=>{
                    return <img key={screenshot.id} src={screenshot.image} className={style.image} alt={"No images for this game yet"}/>
                })}
            </div>
        </div>
    )
}