import { createBrowserRouter } from "react-router-dom";
import HomePage from '../pages/HomePage.jsx';
import ShopPage from '../Pages/ShopPage.jsx';
import GamePage from '../Pages/GamePage.jsx';
import App from '../App.jsx';

const routes = createBrowserRouter([
    {  index: '/', 
       element: <App />,
       children: [
        {   index: true, 
            element: <HomePage />
        },
        {   path: 'shop',
            element: <ShopPage />,
        },
        {   path: ':gameId', 
            element: <GamePage />,
        },
       ]
    },
    
])

export default routes;