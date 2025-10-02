import { CartContext } from '../../contexts/contexts.js'
import {useContext} from 'react'
import exitIcon from '../../assets/close-circle-svgrepo-com.svg'
import style from './Cart.module.css'
import { motion } from 'motion/react';

export default function Cart(){

    const {cart, removeFromCart, clearCart, cartDisplaying, closeCart} = useContext(CartContext);

    return (
      cartDisplaying && 
        <>  
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: .50 }}
                exit={{ opacity: 0 }}
                transition={{ type: "ease" }}
                onClick={()=>closeCart()}
                className={`${style.overlay}`}
                >

            </motion.div>
            <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className={`${style.cartContainer}`}>

                <div className={style.top}>
                    <h2>
                    {cart.length
                        ? cart.length > 1
                        ? `${cart.length} games`
                        : `${cart.length} game`
                        : "Wishlist is empty"}
                    </h2>
                    <span className={style.clear}onClick={()=>clearCart()}>Clear</span>
                </div>
                {cart.map((game)=>{
                    return (
                        <div className={style.cartGame}>
                            <div className={style.gameData}>
                                <div className={style.title}>{game["name"]}</div>
                                <div className={style.imgContainer} ><img src={game["background_image"]} alt="Wishlist preview" /></div>
                            </div>
                            <div className={style.closeIcon}><img onClick={()=>removeFromCart(game)} src={exitIcon} alt="" /></div>
                        </div>
                    )
                })}
            </motion.div>
        </>
    )
}