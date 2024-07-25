import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGear, faUser } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {


  return (
    <div className="sm:hidden fixed bottom-0 left-0 w-full flex justify-around items-center bg-background/95 backdrop-blur text-foreground z-10 h-[--header-height]">
      <Link to="/" className="icon home-icon text-xl mx-[20px] active:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Accueil">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <Link to="/settings" className="icon gear-icon text-xl mx-[20px] active:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Paramètres">
        <FontAwesomeIcon icon={faGear} />
      </Link>
      <Link to="/profile" className="icon bug-icon text-xl mx-[20px] active:scale-125 transition duration-300 ease-in-out cursor-pointer" title="Signaler un bug">
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </div>
  );
};

export default Navbar;
