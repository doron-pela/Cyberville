import style from "./SearchBar.module.css";

export default function SearchBar() {
    return (<input
            placeholder={"Search a game"}
            className={style["search-bar"]}
          />);
}