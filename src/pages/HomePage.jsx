import Hero from '../components/Hero/Hero.jsx';
import Welcome from '../components/Welcome/Welcome.jsx'
import { useOutletContext } from 'react-router-dom';
import Previews from '../components/Previews/Previews.jsx';

export default function HomePage(){
    const {welcomed, setWelcomed} = useOutletContext();
    return (
      <>
        <Welcome welcomed={welcomed} setWelcomed={setWelcomed} />
        <Hero welcomed={welcomed} />
        <Previews />
      </>
    );
}