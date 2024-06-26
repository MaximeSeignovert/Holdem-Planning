import * as PT from 'prop-types';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSquare } from '@fortawesome/free-solid-svg-icons';

const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

const Ticket = ({ticket, inProgress, handleCloseItem, time, handleDeleteItem}) => {
  return (
    <div className='flex flex-row items-center  max-w-[100vw] px-2 my-2 h-[50px]'>
        <div className='w-[80%] h-[100%] flex-1 flex flex-row justify-around border items-center bg-white dark:bg-gray-800 backdrop-blur rounded-lg shadow p-1 rounded'>
            <a href={ticket.link} className='font-medium hover:underline' target="_blank" rel="noreferrer"> <p id='ticket-name'>{ticket.name}</p></a>
            <p>{ticket.startTime} - {ticket.endTime ? ticket.endTime : formatTime(time)}</p>
            
        </div>
        {inProgress && <Button className='ml-2' title='Arrêter le ticket' onClick={handleCloseItem}>
              <FontAwesomeIcon icon={faSquare} />
            </Button> }
        <Button variant='destructive' title='Supprimer le ticket' className='ml-2' onClick={handleDeleteItem}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
    </div>
    
  );
};

Ticket.propTypes = {
    ticket: PT.object.required,
    inProgress: PT.bool,
    handleCloseItem: PT.function,
    time: PT.number,
  };

export { Ticket };
