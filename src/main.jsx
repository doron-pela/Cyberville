import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import routes from './Routes/AppRoutes.jsx';
import { RouterProvider } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </QueryClientProvider>
  </StrictMode>
);
