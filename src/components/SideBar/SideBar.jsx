import {useEffect} from 'react'
import { MdCategory } from "react-icons/md";
import { BiMenu, BiSolidCog, BiPowerOff } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaTags } from "react-icons/fa";
import { platformIcons, genreIcons } from "../../utils/sidebarIcons.jsx";

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

    const iconSize = 20;

    return (
    <section onClick={()=>setIsHidden((prev)=>!prev)} className={`${styles.sidebar} ${isHidden ? styles.hide : ""}`}>

        <BiMenu size={22} className={styles.menuIcon}/>

        <div className={styles.menuFlex}>
            <ul className={`${styles.sideMenu} ${styles.top}`}>
                
                <div>
                    <li className={selected.key==="platforms"&&isHidden? styles.selected: null}>
                    <a href="#">
                        <IoLogoGameControllerB size={iconSize} />
                        <span className={styles.text}>Platforms</span>
                    </a>
                    </li>
                    {isHidden? null
                    :   
                        QueryKeys.platforms.map((platform, i)=>{
                            const string = platform[1];
                            const Icon = platformIcons[string];
                            return (
                            <li className={platform===QueryKeys[selected.key][selected.index]? styles.selected: null} onClick={()=>setSelected({key: 'platforms', index: i})} key={platform}>
                                <a className={styles.subTextWrapper} href="#">
                                <span className={styles.subText}>
                                    {Icon && <Icon className={styles.icon} size={iconSize}/>}
                                    {platform[1]}
                                </span>
                                </a>
                            </li>
                            );
                        })
                    }
                </div>

                <div>
                    <li className={selected.key==="release dates"&&isHidden? styles.selected: null}>
                    <a href="#">
                        <CiCalendarDate size={iconSize} />
                        <span className={styles.text}>Release dates</span>
                    </a>
                    </li>
                    {isHidden? null
                    :
                        QueryKeys['release dates'].map((timeline, i)=>{
                            return (
                            <li className={timeline===QueryKeys[selected.key][selected.index]? styles.selected: null} onClick={()=>setSelected({key: 'release dates', index: i})} key={timeline}>
                                <a className={styles.subTextWrapper}href="#">
                                <span className={styles.subText}>{i===2? timeline[0] :timeline}</span>
                                </a>
                            </li>
                            );
                        })
                    }
                </div>

                <div>
                    <li className={selected.key==="genres"&&isHidden? styles.selected: null}>
                    <a href="#">
                        <MdCategory size={iconSize} />
                        <span className={styles.text}>Genres</span>
                    </a>
                    </li>
                    {isHidden? null
                    : 
                        QueryKeys.genres.map((genre, i)=>{
                            const Icon = genreIcons[i].icon;
                            return (
                            <li className={genre===QueryKeys[selected.key][selected.index]? styles.selected: null} onClick={()=>setSelected({key: 'genres', index: i})} key={genre}>
                                <a className={styles.subTextWrapper} href="#">
                                <span className={styles.subText}>{genreIcons[i] && <Icon className={styles.icon} size={iconSize}/>}{genre}</span>
                                </a>
                            </li>
                            );
                        })
                    }
                </div>

                <div>
                    <li className={selected.key==="tags"&&isHidden? styles.selected: null}>
                    <a href="#">
                        <FaTags size={iconSize} />
                        <span className={styles.text}>Tags</span>
                    </a>
                    </li>
                    {isHidden? null
                    :
                        QueryKeys.tags.map((tag, i)=>{
                        return (
                            <li className={tag===QueryKeys[selected.key][selected.index]? styles.selected: null} onClick={()=>setSelected({key: 'tags', index: i})} key={tag}>
                            <a className={styles.subTextWrapper} href="#">
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
                    <BiSolidCog size={iconSize} className={styles.spinHover} />
                    <span className={styles.text}>Settings</span>
                </a>
                </li>
                <li>
                <a href="#" className={styles.logout}>
                    <BiPowerOff size={iconSize} className={styles.burstHover} />
                    <span className={styles.text}>Logout</span>
                </a>
                </li>
            </ul>
        </div>
    </section>
    )
  

}