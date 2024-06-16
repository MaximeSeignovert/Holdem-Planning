import React from 'react'
import ReactDOM from 'react-dom/client';
import { UserSettingsProvider } from './contexts/userSettingsContext';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './index.css'
import Reunion from './pages/Reunion/page';
import Export from './pages/Export/page';
import Report from './pages/Report/page';
import Home from './pages/page';
import Layout from './pages/Layout';
import Settings from './pages/Settings/page';

// Fonction pour vérifier et appliquer le mode sombre
const applyDarkMode = () => {
  const isDarkMode = localStorage.getItem('theme') === 'dark';
  if (isDarkMode) {
    document.documentElement.classList.add('dark'); // Ajoute la classe 'dark-mode' au body
  }
};

// Appel de la fonction pour appliquer le mode sombre lors du chargement de la page
applyDarkMode();

const router = createBrowserRouter([{
  
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Report",
      element: <Report />,
    },
    {
      path: "/Reunion",
      element: <Reunion />,
    },
    {
      path: "/Export",
      element: <Export />,
    },
    {
      path: "/Settings",
      element: <Settings />,
    },
  ]
}

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserSettingsProvider>
      <RouterProvider router={router} />
    </UserSettingsProvider>
     
  </React.StrictMode>,
)
