import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGear, faBug } from '@fortawesome/free-solid-svg-icons';
import Settings from '@/components/Settings/Settings';
import { useState, useRef } from 'react';
import useClickAway from '@/hooks/useClickAway';


const Header = () => {
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
    <header className="hidden sm:flex fixed top-0 left-0 w-full justify-between items-center bg-background/95 backdrop-blur text-foreground z-10 h-[--header-height] shadow">
      <Link to="/" className="icon home-icon text-xl mx-[20px] hover:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Accueil">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <div className="flex items-center">
        <Link to="/report" className="icon bug-icon text-xl mx-[20px] hover:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Signaler un bug">
          <FontAwesomeIcon icon={faBug} />
        </Link>
        <button ref={buttonRef} onClick={toggleSettings} className='text-xl mx-[20px] hover:scale-125 transition duration-300 ease-in-out cursor-pointer ' title="Paramètres">
          <FontAwesomeIcon icon={faGear}/>
        </button>
        {settingsShown && (
          <div ref={settingsRef}>
            <Settings className='transition ease-in-out delay-1000' />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
