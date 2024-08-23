import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuSidebar = ({ isExpanded, icon, link, desc, title, notificationActivated = false, WIP = false }) => {
  return (
    <li className=''>
      {notificationActivated && <span className='text-[9px] text-center text-white absolute left-3 bg-red-500 rounded-full px-1 select-none'></span>}
      <Link to={link} className={`mx-2 px-4 py-2 h-[36px] text-center flex items-center ${isExpanded ? 'justify-start' : 'justify-start' } space-x-4 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded`} title={title}>
        <FontAwesomeIcon className='text-base' icon={icon} />
        <p className={`text-sm text-nowrap font-medium ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ease-in-out`}>{desc}</p>
        {WIP && isExpanded && <span className='text-[9px] text-center text-white bg-yellow-600 rounded-full px-1 select-none'>WIP</span>}
      </Link>
      
    </li>
  );
};

export default MenuSidebar;
