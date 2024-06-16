import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGear, faBug } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center bg-primary text-primary-foreground z-10 h-16">
      <Link to="/" className="icon home-icon text-2xl mx-[20px]" title="Home">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <div className="flex items-center">
        <Link to="/report" className="icon bug-icon text-2xl mx-[20px]" title="Signaler un bug">
          <FontAwesomeIcon icon={faBug} />
        </Link>
        <Link to="/settings" className="icon gear-icon text-2xl mx-[20px]" title="Paramètres">
          <FontAwesomeIcon icon={faGear} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
