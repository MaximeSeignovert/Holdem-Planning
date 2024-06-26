import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGear, faBug } from '@fortawesome/free-solid-svg-icons';
import Settings from '@/components/Settings/Settings';
import { useState } from 'react';

const Header = () => {
  const [settingsShown, setSettingsShown] = useState(false);

  const toggleSettings = () =>{
    setSettingsShown(!settingsShown)
  }

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center bg-[--primary-color] text-white z-10 h-[--header-height]">
      <Link to="/" className="icon home-icon text-xl mx-[20px] hover:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Accueil">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <div className="flex items-center">
        <Link to="/report" className="icon bug-icon text-xl mx-[20px] hover:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Signaler un bug">
          <FontAwesomeIcon icon={faBug} />
        </Link>
        <button onClick={toggleSettings} className='text-xl mx-[20px] hover:scale-125 transition duration-300 ease-in-out cursor-pointer ' title="Paramètres">
          <FontAwesomeIcon icon={faGear}/>
        </button>
        {settingsShown && <Settings className='transition ease-in-out delay-1000'/>}
      </div>
    </header>
  );
};

export default Header;
