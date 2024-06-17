import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti'
import { Button } from '@/components/ui/button'
import { Ticket } from '@/components/ticket';


const Export = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
        navigate('/');
    }
  }, [navigate]);

  const handleExport = async () => {
    let exportContent = "";
    tickets.forEach((ticket) => {
      exportContent += ticket.name + "   " + ticket.startTime + " - " + ticket.endTime + "\n";
    });
  
    try {
      const blob = new Blob([exportContent], { type: "text/plain" });
      const now = new Date();
      const dateString = now.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `Réunion_${dateString}.txt`;
      a.click();
      toast.success("Exporté !", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
      });
    } catch (err) {
      console.error("Failed to export: ", err);
      toast.error("Échec de l'export !", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
      });
    }
  };

  const handleCopy = async () => {
    let clipboardContent =""
     tickets.forEach(async (ticket) => {
      clipboardContent += ticket.name +'   '+ ticket.startTime +' - ' + ticket.endTime + '\n';
    });

    try{
      await navigator.clipboard.writeText(clipboardContent);
      toast.success('Copié !', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
        });
    }catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Échec de la copie !', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
        });
    }
  };
  
  return (
    <>
    <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false}/>
    <div className='mt-[200px] flex flex-col justify-center items-center' >
      
      <h1 className='text-2xl font-bold mb-5'>Exportation des fiches</h1>
      <ul id="ticket-list">
        {tickets.map((ticket, index) => (
          <li className='flex items-center justify-center ' key={index}>
            <Ticket 
                ticket={ticket}
                inProgress={false}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center space-x-4">
        <Button onClick={handleExport}>Exporter</Button>
        <Button onClick={handleCopy}>Copier</Button>
      </div>
    </div>
    <ToastContainer />
    </>
    
  );
}

export default Export;
