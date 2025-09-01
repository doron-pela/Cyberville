import {useRef, useEffect} from "react";
import React from "react";
import Typed from "typed.js";
import welcome from './Welcome.module.css';

export default function Welcome({welcomed, setWelcomed}) {
  // Reference for storing DOM span element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Welcome <br/> To", ""], 
      typeSpeed: 100,
      smartBackspace: true,    // Smart backspace will only kick off if 2nd string is different than the 1st, hence the empty space
      backSpeed: 50,           //backspace speed
      cursorChar: '|',
      onComplete: (self) => {  // Type object's Callback function for when typing is complete
        self.destroy();
        setWelcomed(true);        //Typed object is destroyed after completion
      }, 
    });
    
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      {welcomed? 
        null : 
      <div className={welcome.welcome}>
        <span ref={el} />
      </div>}
    </>
  );
}