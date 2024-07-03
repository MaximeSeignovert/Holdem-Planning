import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Ticket } from '@/components/ticket';
import moment from 'moment/moment';


const Reunion = () => {
  const [startTimeMeeting, setStartTimeMeeting] = useState(null);
  const [time, setTime] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  /*const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };*/

  const getElapsedTime = (timeStart) => {
    if(timeStart === null) return '00:00:00';
    const diffInMilliseconds = moment().diff(timeStart);
    const duration = moment.duration(diffInMilliseconds);
    return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
  };

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
          return { ...item, endTime: getElapsedTime(startTimeMeeting) };
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
    console.log(moment(12))
    if(inputValue !== null && inputValue !== ""){
      handleAddItem();
    }
  };

  const handleStartMeeting = () => {
    setIsRunning(true);
    setStartTimeMeeting(moment())
    console.log(moment());
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
    setTime(0);
  };
  
  useEffect(() => {
    // Mettre à jour le localStorage une fois que la liste a été mise à jour avec succès
    if (!isRunning && list.length > 0) {
      localStorage.setItem('tickets', JSON.stringify(list));
      console.log("test")
      navigate("/export");
    }
  }, [isRunning, list, navigate]);
  
  
  return (
    <div className='mt-[200px] w-[100vw]'>
      <div id='reunion'>
      <div className='flex flex-row items-center justify-evenly my-5 '>
        <h1 className='text-2xl font-bold' id='chrono-reunion'>{isRunning ? getElapsedTime(startTimeMeeting) : 'Réunion'}</h1>
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
                    time={time}
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
