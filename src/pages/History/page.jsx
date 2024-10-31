import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Copy, Save, X } from "lucide-react";

import { Button } from '@/components/ui/button';
import { useUserSettings } from '@/contexts/userSettingsContext';
import moment from 'moment/min/moment-with-locales';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {getAllMeetingSummaries, deleteMeetingSummary} from '@/services/history.service';

const History = () => {


  const { isDarkMode } = useUserSettings();
  const { user } = useAuth();
  const [meetingSummaries, setMeetingSummaries] = useState([]);
  const [isAscending, setIsAscending] = useState(false); // État pour gérer l'ordre de tri

  moment.locale('fr');



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
    async function fetchMeetings() {
        const meetings = await getAllMeetingSummaries(user.id);
        setMeetingSummaries(sortSummaries(meetings, isAscending));
    }
    fetchMeetings();
  }, []);

  function sortSummaries(summaries, ascending) {
    return summaries.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }

  function toggleSortOrder() {
    console.log("toggleSortOrder");
    setIsAscending(!isAscending);
    setMeetingSummaries(sortSummaries(meetingSummaries, isAscending));
  }

  function getDateFormated(date) {
    return moment(date).format('LLL');
  }

  async function handleDeleteSummary(summaryId){
    deleteMeetingSummary(summaryId);
    let meetings = await getAllMeetingSummaries(user.id)
    setMeetingSummaries(sortSummaries(meetings, isAscending));
  }

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold m-3'>Historique des réunions</h1>
      <Button 
        className='bg-primary p-2 m-3 rounded' 
        onClick={toggleSortOrder}
        title={`Trier par date ${isAscending ? 'descendante' : 'ascendante'}`}
      >
        <FontAwesomeIcon icon={isAscending ? faSortDown : faSortUp} />
        <span className='ml-2'>{isAscending ? 'Plus anciennes d\'abord' : 'Plus récentes d\'abord'}</span>
      </Button>
      
      <Accordion type="single" collapsible className="w-full">
        {meetingSummaries?.map((summary, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              Réunion du {getDateFormated(summary.created_at)}
            </AccordionTrigger>
            <AccordionContent>
              <ul className='pl-5'>
                <div className='flex gap-2 justify-end'>
                <Button onClick={() => handleDeleteSummary(summary.id)} className='bg-red-500 text-white'><X/>Supprimer</Button>
                <Button onClick={() => copyMeetingSummary(summary.content)} className='bg-blue-500 text-white'><Copy/>Copier</Button>
                <Button onClick={() => downloadMeetingSummary(summary.content, summary.created_at)} className='bg-green-500 text-white'><Save/>Exporter</Button>
                </div>
                {summary.content && JSON.parse(JSON.stringify(summary.content)).map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <div className='flex space-x-5 px-3 py-1 m-1 rounded border'>
                      <a className='font-bold hover:underline' href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>
                      <p>{item.startTime} - {item.endTime}</p>
                      
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <ToastContainer />
    </div>
  );
};

export default History;
