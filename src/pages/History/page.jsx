import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient'; // Importe le client configuré
import { useAuth } from '@/contexts/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendarDays, faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { useUserSettings } from '@/contexts/userSettingsContext';
import moment from 'moment/min/moment-with-locales';  // Importer moment avec toutes les locales


const History = () => {
  const { isDarkMode } = useUserSettings();
  const { user } = useAuth();
  const [meetingSummaries, setMeetingSummaries] = useState([]);

  // Définir la localisation française pour Moment
  moment.locale('fr');

  // Fonction pour récupérer les comptes rendus de réunion pour l'utilisateur connecté
  async function getAllMeetingSummaries() {
    const { data, error } = await supabase
      .from('meeting_history')
      .select('*')
      .eq('user_id', user.id); // Filtre par l'ID de l'utilisateur

    if (error) {
      console.error('Erreur lors de la récupération des comptes rendus:', error);
      return null;
    } else {
      return data;
    }
  }

  // Fonction pour supprimer une réunion de la base de données
  async function deleteMeetingSummary(id) {
    const { error } = await supabase
      .from('meeting_history')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression du compte rendu:', error);
    } else {
      // Met à jour l'état local pour retirer la réunion supprimée
      setMeetingSummaries(meetingSummaries.filter(summary => summary.id !== id));
    }
  }

  // Fonction pour copier le contenu de la réunion dans le presse-papiers
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

  // Fonction pour télécharger le contenu de la réunion en tant que fichier JSON
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

  // Utilise useEffect pour récupérer les données lorsque le composant est monté
  useEffect(() => {
    async function fetchMeetingSummaries() {
      const summaries = await getAllMeetingSummaries();
      if (summaries) {
        setMeetingSummaries(summaries);
      }
    }
    fetchMeetingSummaries();
  }, [user]); // Dépendance sur `user` pour recharger si l'utilisateur change

  function getDateFormated(date) {
    return moment(date).format('LLL'); // Format de la date avec le mois et l'année en français
  }

  return (
    <div>
      <h1 className='text-2xl font-bold m-3'>Historique des réunions</h1>
      <ul className='m-3 space-y-5 w-max'>
        {meetingSummaries.map((summary, index) => (
          <li className='border rounded bg-card shadow' key={index}>
            <div className='flex w-full justify-end'>
              <Button className='bg-blue-500 w-4 h-4 p-3 m-1'  title='Download meeting' onClick={() => downloadMeetingSummary(summary.content, summary.created_at)} ><FontAwesomeIcon className='text-base' icon={faDownload}/></Button>
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
