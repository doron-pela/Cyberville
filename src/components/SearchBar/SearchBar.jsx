import style from "./SearchBar.module.css";
import searchIcon from "../../assets/search-alt-2-svgrepo-com.svg"
import {useContext, useState, useEffect} from 'react';
import { SearchContext } from "../../contexts/contexts.js";

export default function SearchBar() {
    const {searchTerm, setSearchTerm, setSearchEnabled} = useContext(SearchContext);
    const [tentativeTerm, setTentativeTerm] = useState(searchTerm);
    useEffect(()=>{
        const cleanedSearch = tentativeTerm.trim();
        const timeOutReference = setTimeout(()=>{
            if(cleanedSearch !== ""){
                setSearchTerm(cleanedSearch);
            }
        }, 2500)

        return ()=>{
            clearTimeout(timeOutReference);
        }
    }, [tentativeTerm, searchTerm])

    // console.log("search term: ", searchTerm)
    // console.log("search enabled: ", searchEnabled)

    function handleChange(e){
      const currentInput = e.target.value;
      setTentativeTerm(currentInput); //We can't set our global context search term on every keystroke. 
                                    // After the first search, search enabled is true now and fetch will happen on  every input change (too many queries). 
                                    // We set our current input to a local reference, then only set our search term after 2.5 seconds since our last input change (the tentative search) - 
                                    // This setting of our final searchTerm after a while, only after a dependency (tentatve Search) changes, is an effect. 
    }

    function handleSearch(){
        const trimmedSearch = searchTerm.trim()
        if(trimmedSearch!== ""){
            setSearchTerm(trimmedSearch)
            setSearchEnabled(true)
        }
    }

    function handleKeyDown(e){
        if(e.key ==="Enter"){
            handleSearch();
        }
    }

    return (
        <div className={style["searchBarContainer"]}>
            <input onKeyDown={(e)=>handleKeyDown(e)} onChange={(e)=>handleChange(e)} value={tentativeTerm} placeholder={"Search a game"} className={style["search-bar"]}/>
            <img onClick={()=>handleSearch()} src={searchIcon} className={style["searchIcon"]} alt="Search Icon" /> 
        </div>  

    );
}