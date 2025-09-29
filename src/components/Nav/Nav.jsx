import {Link, useMatch} from 'react-router-dom';
import logo from "../../assets/cyberville_icon.png";
import home from '../../assets/home-icon-svgrepo-com.svg';
import cartIcon from "../../assets/cart-large-minimalistic-svgrepo-com.svg";
import style from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar.jsx';

export default function Nav(){
   
    // const inHome = useMatch('/');
    const inShop = useMatch('/shop');

    return (
      <nav className={inShop && style.inShop}>
        <Link to="/" className={style.logoBox}>
          <div className={style.imgContainer}>
            <img src={logo} alt="Cyberville_icon" />
          </div>
          <h1 className={style.logoTitle}>Cyberville</h1>
        </Link>

        {inShop && <SearchBar />}

        <div className={style.rightNav}>
          <Link to={"/"}><img src={home} alt="home-icon" className={style.home} /></Link>
          <Link to={"/shop"}>Shop</Link>
          <button>{cartIcon && <img src={cartIcon} alt="cart-icon" />}</button>
        </div>
      </nav>
    );
}