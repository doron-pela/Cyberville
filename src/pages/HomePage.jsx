import Hero from '../components/Hero/Hero.jsx';
import Welcome from '../components/Welcome/Welcome.jsx'
import { useOutletContext } from 'react-router-dom';

export default function HomePage(){
    const {welcomed, setWelcomed} = useOutletContext();
    return (
        <>
            <Hero welcomed={welcomed} />
            <Welcome welcomed={welcomed} setWelcomed={setWelcomed} />
        </>
    )
}