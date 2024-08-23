import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button';

const Notification = ({ notificationType, notificationText }) => {

  return (
    <li className='flex items-center justify-between border rounded-lg w-full p-2 m-2'>
      <div className='flex items-center space-x-2 ml-2 max-w-[80%]'>
        {notificationType == "msg" && <FontAwesomeIcon className='text-base' icon={faEnvelope} />}
        {notificationType == "invitation" && <FontAwesomeIcon className='text-base' icon={faUserPlus} />}
        <p className='w-[50vw] text-nowrap text-ellipsis overflow-hidden'>{notificationText}</p>
      </div>
      <div className=' flex justify-end space-x-2 max-w-[20%]'>
        {notificationType == "invitation" &&  <Button className='bg-green-500 w-4 h-4 p-3'>
            <FontAwesomeIcon className='text-base' icon={faCheck} />
            </Button>}
        <Button className='bg-red-500 w-4 h-4 p-3'><FontAwesomeIcon className='text-base' icon={faXmark} /></Button>
      </div>
    </li>
  );
};

export default Notification;
