import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGear, faBug } from '@fortawesome/free-solid-svg-icons';
import Settings from '@/components/Settings/Settings';
import { useState, useRef } from 'react';
import useClickAway from '@/hooks/useClickAway';


const Navbar = () => {
  const [settingsShown, setSettingsShown] = useState(false);
  const settingsRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleSettings = () => {
    setSettingsShown(!settingsShown);
  };

  useClickAway(settingsRef, (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      return;
    }
    if (settingsShown) {
      setSettingsShown(false);
    }
  });

  return (
    <div className="sm:hidden fixed bottom-0 left-0 w-full flex justify-around items-center bg-background/95 backdrop-blur text-foreground z-10 h-[--header-height]">
      <Link to="/" className="icon home-icon text-xl mx-[20px] active:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Accueil">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <Link to="/report" className="icon bug-icon text-xl mx-[20px] active:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Signaler un bug">
        <FontAwesomeIcon icon={faBug} />
      </Link>
      <Link to="/settings" className="icon gear-icon text-xl mx-[20px] active:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Paramètres">
        <FontAwesomeIcon icon={faGear} />
      </Link>
    </div>
  );
};

export default Navbar;
