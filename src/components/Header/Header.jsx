import { Link } from 'react-router-dom';
import ProfileButton from '../Profile/ProfileButton';


const Header = () => {

  return (
    <header className="hidden sm:flex relative top-0 w-full justify-end items-center bg-background/95 backdrop-blur text-foreground z-10 h-[--header-height] border-b ">
      <Link to="/profile" title="Go to profile">
        <ProfileButton  />
      </Link>
    </header>
  );
};

export default Header;
