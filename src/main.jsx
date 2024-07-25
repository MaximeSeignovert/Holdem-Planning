import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { UserSettingsProvider, useUserSettings } from './contexts/userSettingsContext';
import './index.css';
import Profile from './pages/Profile/page';
import Reunion from './pages/Reunion/page';
import Export from './pages/Export/page';
import Report from './pages/Report/page';
import Settings from './pages/Settings/page';
import History from './pages/History/page';
import Home from './pages/page';
import Layout from './pages/Layout';
import Login from '@/components/Login/Login';
import AuthProvider, { useAuth } from '@/contexts/AuthProvider';

// Composant pour les routes protégées
const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Vous pouvez personnaliser ceci avec un spinner de chargement
  }
  console.log(user)
  return user ? element : <Navigate to="/login" />;
};

// Hook pour vérifier et appliquer le mode sombre
const useApplyDarkMode = () => {
  const { isDarkMode } = useUserSettings();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PrivateRoute element={<Home />} />,
      },
      {
        path: "/settings",
        element: <PrivateRoute element={<Settings />} />,
      },
      {
        path: "/report",
        element: <PrivateRoute element={<Report />} />,
      },
      {
        path: "/reunion",
        element: <PrivateRoute element={<Reunion />} />,
      },
      {
        path: "/export",
        element: <PrivateRoute element={<Export />} />,
      },
      {
        path: "/profile",
        element: <PrivateRoute element={<Profile />} />,
      },
      {
        path: "/history",
        element: <PrivateRoute element={<History />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  useApplyDarkMode(); // Appeler le hook pour appliquer le mode sombre

  return (
    <RouterProvider router={router} />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserSettingsProvider>
        <App />
      </UserSettingsProvider>
    </AuthProvider>
  </React.StrictMode>,
);
