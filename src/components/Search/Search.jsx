import style from "./Search.module.css";

export default function Search() {
  return (
    <section className={style["search"]}>
      <div className={style["search-container"]}>
        <div className={style["background"]}>
            <div ></div>
            <div ></div>
            <div ></div>
        </div>
        <div className={style["search-bar-container"]}>
          <input
            placeholder={"Search a game"}
            className={style["search-bar"]}
          />
        </div>
      </div>
    </section>
  );
}
