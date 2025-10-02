import { useState } from 'react';
import {Outlet} from 'react-router-dom';
import Welcome from './components/Welcome/Welcome.jsx';
import Nav from './components/Nav/Nav.jsx';
import Cart from './components/Cart/Cart.jsx'
import Hero from './components/Hero/Hero.jsx';
import GameContextProvider from './contexts/GameContext.jsx';
import SearchContextProvider from "./contexts/SearchContextProvider.jsx";
import CartContextProvider from './contexts/CartContextProvider.jsx'
import { AnimatePresence } from 'motion/react';

function App() {

  const [welcomed, setWelcomed] = useState(false);

  return (
    <>
      <CartContextProvider>
          <SearchContextProvider>
            <Cart />
            <Nav/>
            <GameContextProvider>
              <AnimatePresence>
                <Outlet context={{ welcomed, setWelcomed }} />
              </AnimatePresence>
            </GameContextProvider>
          </SearchContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App
