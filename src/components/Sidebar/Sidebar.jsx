import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGear, faBug, faChevronLeft, faChevronRight, faClockRotateLeft, faSitemap, faBell } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import MenuSidebar from './MenuSidebar';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='hidden sm:flex relative h-full'>
        <div className={`flex h-full ${isExpanded ? 'w-64' : 'w-16'}  items-center z-10 bg-background/95 backdrop-blur border-r shadow flex-col transition-width duration-300 ease-in-out`}>
        
            {/* Titre */}
            <div className='w-full flex items-start justify-start p-4'>
                <div className='flex items-center space-x-4'>
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Flower%20Playing%20Cards.png" alt="Flower Playing Cards" className='w-[32px]' />
                {isExpanded && <h1 className='text-nowrap text-lg font-bold'>Holdem Planning</h1>}
                </div>
            </div>

            {/* Liste des menus */}
            <ul className='w-full flex-col justify-start mt-5 space-y-2'>
                <MenuSidebar isExpanded={isExpanded} icon={faHome} link="/" desc="Home" title="Home" />
                <MenuSidebar isExpanded={isExpanded} icon={faClockRotateLeft} link="/history" desc="Account history" title="History" WIP={true}/>
                <MenuSidebar isExpanded={isExpanded} icon={faSitemap} link="/" desc="Organizations" title="Organizations" WIP={true}/>
                <MenuSidebar isExpanded={isExpanded} icon={faBell} link="/notifications" desc="Notifications" title="Notfications" notificationActivated={true} WIP={true} />
                <MenuSidebar isExpanded={isExpanded} icon={faGear} link="/settings" desc="Settings" title="Settings" />
                <MenuSidebar isExpanded={isExpanded} icon={faBug} link="/report" desc="Report a bug" title="Report a bug" />
            </ul>
        </div>

        {/* Bouton pour étendre ou réduire la sidebar */}
        <div className='z-20 absolute top-1/2 transform -translate-y-1/2 right-[-16px]'>
            <button onClick={toggleSidebar} className='focus:outline-none bg-background rounded-full border h-[32px] w-[32px] flex items-center justify-center'>
                <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faChevronRight} />
            </button>
        </div>
    </div>
  );
};
export default Sidebar;
