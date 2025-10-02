import styles from './CardData.module.css'
import { platformIcons } from '../../utils/sidebarIcons.jsx'
import checkMark from '../../assets/checkmark-circle-svgrepo-com.svg'
import { CartContext } from "../../contexts/contexts.js";
import { useContext } from "react";
import {motion} from 'motion/react'

export default function CardData({gameData, toGamePage}){

    const myPlatforms = gameData['parent_platforms']? gameData['parent_platforms'].map((platform)=>platform['platform']['name']) : null; //got platform strings from this game card's data

    const myIcons = myPlatforms? myPlatforms.map((iconComponent)=>platformIcons[iconComponent]) : null; //For each of those strings, get component references from our platformIcons utility object

    const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

    function handleClick(gameData){
      if(!isInCart(gameData)){
        addToCart(gameData)
      }else{
        removeFromCart(gameData)
      }
    }

    return (
      <div className={styles.cardData}>
        <div className={styles.top}>
          <div onClick={()=>toGamePage(gameData)} className={styles.title}>{gameData["name"]}</div>
          <li>
            {myIcons &&
              myIcons.map((Icon, i) => (
                <Icon className={styles.icons} key={i} />
              ))}
          </li>
        </div>
        <div className={styles.bottom}>
          
          <span className={`${styles.status} ${isInCart(gameData)? styles.added : styles.unAdded}`} onClick={()=>handleClick(gameData)}>
            {isInCart(gameData)? 
            <motion.span 
              initial={{scale : .2}}
              animate={{scale : 1}}
              className={styles.savedContainer}
              >Saved <img src={checkMark}/>
            </motion.span> : "Save +"}
          </span>

          <p className={styles.playTime}>{gameData["playtime"]? `AVG play: ${gameData["playtime"]} hrs` : `AVG play: - hrs`}</p>
        </div>
      </div>
    );
}