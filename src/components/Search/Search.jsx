import aos from "aos";
import { useEffect } from "react";
import style from "./Search.module.css";


export default function Search() {
  useEffect(() => {
    aos.init({ duration: 500 });
  }, []);

  return (
    <section className={style["search"]}>
      <div className={style["search-container"]}>
        <div className={style["background"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={style["left-blur"]}></div>
        <div className={style["right-blur"]}></div>
        <div className={style["sub-left-blur"]}></div>
        <div className={style["sub-right-blur"]}></div>
        <div data-aos={"fade-up"} className={style["search-bar-container"]}>
          <input
            placeholder={"Search a game"}
            className={style["search-bar"]}
          />
        </div>
      </div>
    </section>
  );
}
