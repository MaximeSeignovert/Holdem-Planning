import { createContext, useContext, useState, useEffect } from 'react';
import * as PT from 'prop-types';

// Créer le contexte
const UserSettingsContext = createContext();



// Créer un hook pour utiliser le contexte
export const useUserSettings = () => useContext(UserSettingsContext);

export const UserSettingsProvider = ({ children }) => {
  // Lire les valeurs initiales à partir du localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [prefix, setPrefix] = useState(() => localStorage.getItem('prefix') || '');
  const [redirect, setRedirect] = useState(() => localStorage.getItem('redirect') === 'true');

  // Synchroniser les changements avec le localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('prefix', prefix);
  }, [prefix]);

  useEffect(() => {
    localStorage.setItem('redirect', redirect);
  }, [redirect]);

  // Fonctions pour mettre à jour les valeurs
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const updatePrefix = (newPrefix) => setPrefix(newPrefix);
  const toggleRedirect = () => setRedirect(prev => !prev);
  
  UserSettingsProvider.propTypes = {
    children: PT.node.isRequired,
  };

  return (
    <UserSettingsContext.Provider value={{ isDarkMode, toggleDarkMode, prefix, updatePrefix, redirect, toggleRedirect }}>
      {children}
    </UserSettingsContext.Provider>
  );


};
