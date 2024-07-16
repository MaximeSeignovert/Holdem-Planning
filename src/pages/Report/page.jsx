import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button'

const Report = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validation des champs
    if (!email || !title || !description) {
      setErrorMessage('Veuillez remplir tous les champs du formulaire.');
      return;
    }
  
    // Construire les données du formulaire
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Titre', title);
    formData.append('Description', description);
  
    try {
      // Soumettre le formulaire
      const response = await fetch('https://formspree.io/f/mayrzzyq', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Afficher un message de succès ou effectuer d'autres actions en cas de succès
        console.log('Formulaire soumis avec succès !');
      } else {
        // Gérer les erreurs de réponse
        console.error('Erreur lors de la soumission du formulaire :', response.statusText);
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error('Erreur lors de la soumission du formulaire :', error.message);
    }
  
    // Réinitialiser le formulaire après soumission
    setEmail('');
    setTitle('');
    setDescription('');
    setErrorMessage('');
  };
  

  return (
    <form onSubmit={handleSubmit} className="mt-[200px] sm:max-w-md mx-auto max-w-[90%]">
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className="mb-4">
        <label htmlFor="email" className="block">Email :</label>
        <Input
          id="email"
          name="Email"
          type="email"
          autoComplete="off"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block">Titre :</label>
        <Input
          id="title"
          name="Titre"
          type="text"
          autoComplete="off"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block">Description :</label>
        <Textarea
          id="description"
          name="Description"
          autoComplete="off"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <Button type="submit" className="w-full">Envoyer le rapport de bug</Button>
    </form>
  );
};

export default Report;
