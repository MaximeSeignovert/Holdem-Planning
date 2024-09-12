import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { useAuth } from '@/contexts/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendarDays, faCopy, faDownload, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { useUserSettings } from '@/contexts/userSettingsContext';
import moment from 'moment/min/moment-with-locales';

const History = () => {
  const { isDarkMode } = useUserSettings();
  const { user } = useAuth();
  const [meetingSummaries, setMeetingSummaries] = useState([]);
  const [isAscending, setIsAscending] = useState(false); // État pour gérer l'ordre de tri

  moment.locale('fr');

  async function getAllMeetingSummaries() {
    const { data, error } = await supabase
      .from('meeting_history')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Erreur lors de la récupération des comptes rendus:', error);
      return null;
    } else {
      return data;
    }
  }

  async function deleteMeetingSummary(id) {
    const { error } = await supabase
      .from('meeting_history')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression du compte rendu:', error);
    } else {
      setMeetingSummaries(meetingSummaries.filter(summary => summary.id !== id));
    }
  }

  function copyMeetingSummary(content) {
    const contentText = JSON.stringify(content, null, 2);
    navigator.clipboard.writeText(contentText)
      .then(() => {
        toast.success('Réunion copié !', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: isDarkMode ? "dark" : "light",
        });
      })
      .catch(err => {
        console.error('Erreur lors de la copie du contenu:', err);
        toast.error('Erreur lors de la copie !', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: isDarkMode ? "dark" : "light",
        });
      });
  }

  function downloadMeetingSummary(content, createdAt) {
    const fileName = `Reunion_${moment(createdAt).format('YYYYMMDD_HHmm')}.json`;
    const fileContent = JSON.stringify(content, null, 2);
    const blob = new Blob([fileContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Fichier téléchargé:', fileName);
  }

  useEffect(() => {
    async function fetchMeetingSummaries() {
      const summaries = await getAllMeetingSummaries();
      if (summaries) {
        setMeetingSummaries(sortSummaries(summaries, isAscending));
      }
    }
    fetchMeetingSummaries();
  }, [user, isAscending]); // Dépendance sur `isAscending` pour changer l'ordre de tri

  function sortSummaries(summaries, ascending) {
    return summaries.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  function getDateFormated(date) {
    return moment(date).format('LLL');
  }

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold m-3'>Historique des réunions</h1>
      <Button 
        className='bg-primary p-2 m-3' 
        onClick={toggleSortOrder}
        title={`Trier par date ${isAscending ? 'descendante' : 'ascendante'}`}
      >
        <FontAwesomeIcon icon={isAscending ? faSortDown : faSortUp} />
        <span className='ml-2'>{isAscending ? 'Plus anciennes d\'abord' : 'Plus récentes d\'abord'}</span>
      </Button>
      <ul className='m-3 space-y-5 w-max'>
        {meetingSummaries.map((summary, index) => (
          <li className='border rounded bg-card shadow' key={index}>
            <div className='flex w-full justify-end'>
              <Button className='bg-blue-500 w-4 h-4 p-3 m-1' title='Download meeting' onClick={() => downloadMeetingSummary(summary.content, summary.created_at)} ><FontAwesomeIcon className='text-base' icon={faDownload}/></Button>
              <Button className='bg-blue-500 w-4 h-4 p-3 m-1' title='Copy meeting' onClick={() => copyMeetingSummary(summary.content)}><FontAwesomeIcon className='text-base' icon={faCopy}/></Button>
              <Button className='bg-red-500 w-4 h-4 p-3 m-1' title='Delete meeting' onClick={() => deleteMeetingSummary(summary.id)} ><FontAwesomeIcon className='text-base' icon={faXmark}/></Button>
            </div>
            <div className='flex justify-start items-center mx-2 space-x-2'>
              <FontAwesomeIcon className='text-base text-foreground' icon={faCalendarDays} />
              <p className='font-semibold'>Réunion du {getDateFormated(summary.created_at)}</p>
            </div>
            <ul className='pl-5'>
              {summary.content && JSON.parse(JSON.stringify(summary.content)).map((item, itemIndex) => (
                <li key={itemIndex}>
                  <div className='flex space-x-5 px-3 py-1 m-1 rounded border'>
                    <a className='font-bold hover:underline' href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>
                    <p>{item.startTime} - {item.endTime}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default History;
