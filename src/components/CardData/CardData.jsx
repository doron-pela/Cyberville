import styles from './CardData.module.css'
import { platformIcons } from '../../utils/sidebarIcons.jsx'

export default function CardData({gameData}){

    const myPlatforms = gameData['parent_platforms']? gameData['parent_platforms'].map((platform)=>platform['platform']['name']) : null; //got platform strings from this game card's data

    const myIcons = myPlatforms? myPlatforms.map((iconComponent)=>platformIcons[iconComponent]) : null; //For each of those strings, get component references from our platformIcons utility object

    return (
      <div className={styles.cardData}>
        <div className={styles.top}>
          <div className={styles.title}>{gameData["name"]}</div>
          <li>
            {myIcons &&
              myIcons.map((Icon, i) => (
                <Icon className={styles.icons} key={i} />
              ))}
          </li>
        </div>
        <div className={styles.bottom}>
          <p className="price">$5</p>
          <span>Add to Cart +</span>
        </div>
      </div>
    );
}