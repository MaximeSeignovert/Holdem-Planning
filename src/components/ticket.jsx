import * as PT from 'prop-types';
import { Button } from '@/components/ui/button';

const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

const Ticket = ({ticket, inProgress, handleCloseItem, time}) => {
  return (
    <div className='flex flex-row justify-between items-center bg-card p-3 rounded my-2'>
        <a href={ticket.link} target="_blank" rel="noreferrer"> <p id='ticket-name'>{ticket.name}</p></a>
        <p>{ticket.startTime} - {ticket.endTime ? ticket.endTime : formatTime(time)}</p>
        {inProgress && <Button onClick={handleCloseItem}>Arrêter la fiche</Button> }
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
