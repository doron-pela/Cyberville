import { useContext } from 'react';
import {Link, useMatch} from 'react-router-dom';
import logo from "../../assets/cyberville_icon.png";
import home from '../../assets/home-icon-svgrepo-com.svg';
import cartIcon from "../../assets/cart-large-minimalistic-svgrepo-com.svg";
import style from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { CartContext } from '../../contexts/contexts.js';

export default function Nav(){
   
    const {openCart} = useContext(CartContext)
    // const inHome = useMatch('/');
    const inShop = useMatch('/shop');
    const inHome = useMatch('/');

    return (
      <nav className={inShop && style.inShop}>
        <Link to="/" className={style.logoBox}>
          <div className={style.imgContainer}>
            <img src={logo} alt="Cyberville_icon" />
          </div>
          {!inHome && <h1 className={style.logoTitle}>Cyberville</h1>}
          <h2 className={style.credit}>Provisioned by RAWG API</h2>
        </Link>

        {inShop && <SearchBar/>}

        <div className={style.rightNav}>
          <Link to={"/"}><img src={home} alt="home-icon" className={style.home} /></Link>
          <Link to={"/shop"}>Shop</Link>
          {cartIcon && <img onClick={()=>openCart()} className={style.cart} src={cartIcon} alt="cart-icon" />}
        </div>
      </nav>
    );
}