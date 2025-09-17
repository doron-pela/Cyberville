import {useEffect} from 'react'
import { MdCategory } from "react-icons/md";
import { BiMenu, BiSolidCog, BiPowerOff } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaTags } from "react-icons/fa";

import styles from './SideBar.module.css'
import {QueryKeys} from '../../utils/QueryKeys.js'
// import { genreStrings } from '../../utils/Genres.js';
// import { dates } from "../../utils/Dates.js";
// import {Platforms} from '../../utils/Platforms.js'
// import { Tags } from "../../utils/Tags.js";

export default function SideBar({isHidden, setIsHidden, selected, setSelected}){
    useEffect(() => {
        function adjustSidebar() {
          if (window.innerWidth <= 576) {
            setIsHidden(true);
          }
        }
    
        adjustSidebar();
        window.addEventListener("resize", adjustSidebar);
    
        return () => window.removeEventListener("resize", adjustSidebar);
    }, []);

    return (
    <section className={`${styles.sidebar} ${isHidden ? styles.hide : ""}`}>
        <BiMenu
        size={22}
        onClick={() => setIsHidden((prev) => !prev)}
        className={styles.menuIcon}
        />

        <div className={styles.menuFlex}>
            <ul className={`${styles.sideMenu} ${styles.top}`}>
                <div>
                    <li className={styles.active}>
                    <a href="#">
                        <MdCategory size={20} />
                        <span className={styles.text}>Genres</span>
                    </a>
                    </li>
                    {isHidden? null
                    : 
                        QueryKeys.genres.map((genre, index)=>{
                            return (
                            <li className={genre===selected? styles.selected: null} onClick={()=>setSelected(QueryKeys.genres[index])} key={genre}>
                                <a href="#">
                                <span className={styles.subText}>{genre}</span>
                                </a>
                            </li>
                            );
                        })
                    }
                </div>

                <div>
                    <li className={styles.active}>
                    <a href="#">
                        <CiCalendarDate size={20} />
                        <span className={styles.text}>Release dates</span>
                    </a>
                    </li>
                    {isHidden? null
                    :
                        QueryKeys['release dates'].map((timeline, index)=>{
                            return (
                            <li className={timeline===selected? styles.selected: null} onClick={()=>setSelected(QueryKeys['release dates'][index])} key={timeline}>
                                <a href="#">
                                <span className={styles.subText}>{timeline}</span>
                                </a>
                            </li>
                            );
                        })
                    }
                </div>

                <div>
                    <li className={styles.active}>
                    <a href="#">
                        <IoLogoGameControllerB size={20} />
                        <span className={styles.text}>Platforms</span>
                    </a>
                    </li>
                    {isHidden? null
                    :   
                        QueryKeys.platforms.map((platform, index)=>{
                            return (
                            <li className={platform[1]===selected? styles.selected: null} onClick={()=>setSelected(QueryKeys.platforms[index][1])} key={platform}>
                                <a href="#">
                                <span className={styles.subText}>{platform[1]}</span>
                                </a>
                            </li>
                            );
                        })
                    }
                </div>

                <div>
                    <li className={styles.active}>
                    <a href="#">
                        <FaTags size={20} />
                        <span className={styles.text}>Tags</span>
                    </a>
                    </li>
                    {isHidden? null
                    :
                        QueryKeys.tags.map((tag, index)=>{
                        return (
                        <li className={tag===selected? styles.selected: null} onClick={()=>setSelected(QueryKeys.tags[index])} key={tag}>
                            <a href="#">
                            <span className={styles.subText}>{tag}</span>
                            </a>
                        </li>
                        );
                    })}
                </div>
            </ul>

            <ul className={`${styles.sideMenu} ${styles.bottom}`}>
                <li>
                <a href="#">
                    <BiSolidCog size={20} className={styles.spinHover} />
                    <span className={styles.text}>Settings</span>
                </a>
                </li>
                <li>
                <a href="#" className={styles.logout}>
                    <BiPowerOff size={20} className={styles.burstHover} />
                    <span className={styles.text}>Logout</span>
                </a>
                </li>
            </ul>
        </div>
    </section>
    )
  

}