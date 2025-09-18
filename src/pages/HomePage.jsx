import Hero from '../components/Hero/Hero.jsx';
import Welcome from '../components/Welcome/Welcome.jsx'
import { useOutletContext } from 'react-router-dom';
import Previews from '../components/Previews/Previews.jsx';
import Map from '../components/Map/Map.jsx';
import Search from '../components/Search/Search.jsx';

export default function HomePage(){
    const {welcomed, setWelcomed} = useOutletContext();
    return (
      <>
        <Welcome welcomed={welcomed} setWelcomed={setWelcomed} />
        <Hero welcomed={welcomed} setWelcomed={setWelcomed} />
        <Previews />
        {/* <Search /> */}
        {/* <Map /> */}
      </>
    );
}