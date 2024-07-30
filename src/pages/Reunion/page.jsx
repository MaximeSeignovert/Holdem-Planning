import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Ticket } from '@/components/ticket';
import { getElapsedTime } from '@/lib/utils';
import moment from 'moment';

const Reunion = () => {
  const [startTimeMeeting, setStartTimeMeeting] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('00:00:00'); // Nouvel état pour le timer
  const navigate = useNavigate();


  const handleAddItem = () => {
    if (currentItem && currentItem.startTime) {
      const updatedList = list.map(item => {
        if (item === currentItem) {
          return { ...item, endTime: getElapsedTime(startTimeMeeting) };
        }
        return item;
      });
      setList(updatedList);
    }
    let prefixRedirection = localStorage.getItem("prefix");
    const newItem = {
      name: prefixRedirection + inputValue,
      startTime: getElapsedTime(startTimeMeeting),
      endTime: null,
      link: `https://hsw-lab.atlassian.net/browse/${prefixRedirection}${inputValue}`,
    };
    let linkRedirection = localStorage.getItem("redirect");
    if(linkRedirection === 'true'){
      window.open(`https://hsw-lab.atlassian.net/browse/${newItem.name}`);
    }
    setList(prevList => [newItem, ...prevList]);
    setInputValue('');
    setCurrentItem(newItem);
  };

  const handleCloseItem = () => {
    if (currentItem && currentItem.startTime) {
      const updatedList = list.map(item => {
        if (item === currentItem) {
          return { ...item, endTime: getElapsedTime(startTimeMeeting)};
        }
        return item;
      });
      setList(updatedList);
      setCurrentItem(null);
    }
  };

  const handleDeleteItem = (itemToDelete) => {
    setList(prevList => prevList.filter(item => item !== itemToDelete));
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      isRunning ? handleAddTicket() : handleStartMeeting()
    }
  }

  const handleAddTicket = () => {
    if(inputValue !== null && inputValue !== ""){
      handleAddItem();
    }
  };

  const handleStartMeeting = () => {
    setIsRunning(true);
    setStartTimeMeeting(moment())
    handleAddTicket()
  }

  const handleStopReunion = () => {
    if (currentItem && !currentItem.endTime) {
      // Il y a une fiche en cours, mettre à jour l'heure de fin
      const updatedList = list.map(item => {
        if (item === currentItem) {
          return { ...item, endTime: getElapsedTime(startTimeMeeting) };
        }
        return item;
      });
      setList(updatedList);
    }
    setIsRunning(false);
  };
  
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(getElapsedTime(startTimeMeeting));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTimeMeeting]);

  useEffect(() => {
    if (!isRunning && list.length > 0) {
      localStorage.setItem('tickets', JSON.stringify(list));
      navigate("/export");
    }
  }, [isRunning, list, navigate]);
  
  
  return (
    <div className='mt-[200px]'>
      <div id='reunion'>
      <div className='flex flex-row items-center justify-evenly my-5 '>
        <h1 className='text-2xl font-bold' id='chrono-reunion'>{isRunning ? elapsedTime : 'Réunion'}</h1>
        {isRunning && <Button variant='destructive' id='' onClick={handleStopReunion}>Fin de la réunion</Button>}
      </div>
      <div className='flex flex-col justify-center items-center '>
        <div className='flex flex-row my-4 px-4 space-x-4 max-w-[750px] sm:w-[70vw] w-[100vw]'>
          <Input type="number" pattern="[0-9]*" inputMode="numeric" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Numéro de la fiche"/>
          <Button onClick={() => {isRunning ? handleAddTicket() : handleStartMeeting()}}>{isRunning ? 'Ajouter' : 'Commencer la réunion'}</Button>
          
        </div>
        <ul className='flex flex-col justify-center max-w-[750px] sm:w-[70vw] w-[100vw]'>
          {list.map((item, index) => (
            <li className='' key={index}>
                <Ticket 
                    ticket={item}
                    inProgress={index === 0 && currentItem === item && currentItem.startTime}
                    handleCloseItem={handleCloseItem}
                    handleDeleteItem={() => handleDeleteItem(item)}  // Passer l'élément à supprimer
                    time={elapsedTime}
                    />
            </li>
          ))}
        </ul>
      
      </div>
      
      </div>
      
    </div>
  );
};

export default Reunion;
