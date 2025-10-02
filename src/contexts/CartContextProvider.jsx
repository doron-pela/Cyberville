import {useState, useEffect} from 'react'
import { CartContext } from './contexts.js'

export default function CartContextProvider({children}){
    const [cartDisplaying, setCartDisplaying] = useState(false);
    const [cart, setCart] = useState(()=>{
        const storedCart = localStorage.getItem("cart"); //Use cart currently in local storage if exists, else set cart to empty array
        const parsed = JSON.parse(storedCart)
        return parsed? parsed : [];
    });

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(game){
        const gameExists = cart.find((g)=>g['id'] === game['id']);
        if (!gameExists){
            setCart((prevCart)=>{
                return [...prevCart, game]
            })
        }
    }

    function removeFromCart(game){
        setCart((prevCart)=>prevCart.filter((g)=> g['id']!==game['id']))
    }

    function clearCart(){
        setCart([])
    }

    function isInCart(game){
        const gameExists = cart.find((g) => g["id"] === game?.["id"]);
        return gameExists;
    }

    function openCart(){
        setCartDisplaying(true);
    }

    function closeCart(){
        setCartDisplaying(false)
    }

    return (
        <CartContext.Provider value={{addToCart, removeFromCart, clearCart, isInCart, openCart, cartDisplaying, closeCart, cart}}>
            {children}
        </CartContext.Provider>
    )
}