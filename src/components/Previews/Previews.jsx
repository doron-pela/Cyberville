import {useEffect} from 'react';
import style from './Previews.module.css';
import previewImage1 from "./p1.jpg";
import previewImage2 from "./p2.jpg";
import previewImage3 from "./p3.jpg";
import previewImage4 from "./p4.jpg";
import aos from "aos";
import "aos/dist/aos.css";



export default function Previews(){
  useEffect(()=>{
    aos.init({duration: 500});
  },[])

    return (
      <section className={style["previews-section"]}>
        <h2>Just released</h2>
        <article className={style["previews-grid"]}>
          <div data-aos={'fade-up'} className={`${style["preview-item"]} ${style["one"]}`}>
            <img src={previewImage1} alt="" />
          </div>
          <div data-aos={'fade-left'} data-aos-delay="100" className={`${style["preview-item"]} ${style["two"]}`}>
            <img src={previewImage2} alt="" />
          </div>
          <div data-aos={'fade-left'} className={`${style["preview-item"]} ${style["three"]}`}>
            <img src={previewImage3} alt="" />
          </div>
          <div data-aos={'fade-up'} data-aos-delay={"200"} className={`${style["preview-item"]} ${style["four"]}`}>
            <img src={previewImage4} alt="" />
          </div>
          {/* <div data-aos={'fade-left'} data-aos-delay={"200"} className={`${style["preview-item"]} ${style["five"]}`}>
            <img src={previewImage4} alt="" />
          </div>
          <div data-aos={'fade-left'} data-aos-delay={"200"} className={`${style["preview-item"]} ${style["six"]}`}>
            <img src={previewImage4} alt="" />
          </div> */}
        </article>
      </section>
    );
}