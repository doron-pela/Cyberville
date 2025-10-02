import style from './Reviews.module.css'
import {useEffect} from 'react'
import {Link, Meta} from 'react-router-dom'

import aos from "aos";
import "aos/dist/aos.css";


export default function Reviews({redditUrl, metacriticPlatforms, ratings, progress}){
    useEffect(() => {
      aos.init({ duration: 500 });
    }, []);

    const clamped = progress > 0.50 ? 1 : progress;
    const boxStyle = {
      filter: `blur(${(1 - clamped) * 10}px)`,
      opacity: clamped,
    };

    
    return (
        <div className={`${style.reviewContainer}`} style={boxStyle}>
            {redditUrl? <div className={`${style["meta-card"]} ${style["reddit"]}`} >
                <div className={style.redditTitle}><h2> Reddit </h2></div>
                <a href={redditUrl} target="_blank" rel="noopener noreferrer">{redditUrl}</a>
            </div>
            : null}

            <div className={style.title}><h2> MetaCritic Scores </h2></div>
            {metacriticPlatforms? 
                metacriticPlatforms?.map((criticism)=>{
                    const key = crypto.randomUUID();
                return (
                <div key={key} className={style["meta-card"]}>
                    <div className={style["meta-score"]}>
                        {criticism["metascore"]}
                    </div>
                    <div className={style["meta-details"]}>
                        <h2 className={style["meta-platform"]}>{criticism["platform"]["name"]}</h2>
                        <p className={style["meta-slug"]}>Slug: {criticism["platform"]["slug"]}</p>
                        <a
                        href={criticism["url"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style["meta-link"]}
                        >
                            View on Metacritic →
                        </a>
                    </div>
                </div>)
                })

            : <div>"No metacritic Ratings yet"</div>
                
            }

            <div className={`${style.title} ${style.ratings}`}><h2> Ratings </h2></div>
            {ratings?
                ratings?.map((rating)=>{
                return (
                <div key={rating['id']} className={`${style["meta-card"]} ${style["ratings"]}`} >
                    <div className={`${style["meta-score"]} ${style.ratingPercent}`}>
                        {rating["percent"]}{'%'}
                    </div>
                    <div className={style["meta-details"]}>
                        <h2 className={style["meta-platform"]}>{rating["title"]}</h2>
                        <p className={style["meta-slug"]}>Count: {rating["count"]}</p>
                    </div>
                </div>)

            })
            
            : <div>"No metacritic Ratings yet"</div>
            }
        </div>
    );
}