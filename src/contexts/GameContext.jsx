import {useState} from 'react'
import { GameContext } from './contexts.js'

export default function GameContextProvider({children}){
    const [gameFromCollection, setGameFromCollection] = useState(null); //Game object data gotten from the collection api at /games
    return (
        <GameContext.Provider value={{gameFromCollection, setGameFromCollection}}>
            {children}
        </GameContext.Provider>
    )
}