import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../src/Context/AuthContext';
import { jsPDF } from 'jspdf';

function GenerateurFacture() {
  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    mail: '',
    adresse: {
      rue: '',
      codePostal: '',
      ville: '',
      pays: '',
    },
    tel: '',
  });

  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  // Récupération des informations utilisateur et des factures
  useEffect(() => {
    if (!user || !user.id) {
      setError('Utilisateur non authentifié.');
      setLoading(false);
      return;
    }
  
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Vous devez être connecté pour voir vos informations.');
          setLoading(false);
          return;
        }
  
        const userResponse = await axios.get(`http://localhost:3001/api/utilisateur/${user.id}`);
        const factureResponse = await axios.get(`http://localhost:3001/api/facture/utilisateur/${user.id}`);
        
        // Vérifiez que vous obtenez bien les informations utilisateur
        console.log('User Info:', userResponse.data); 
        console.log('Factures:', factureResponse.data);
        
        setUserInfo(userResponse.data); // Utilisateur avec adresse et autres infos
        setFactures(factureResponse.data); // Factures de l'utilisateur
  
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des informations de l\'utilisateur.');
        setLoading(false);
        console.log(err);
      }
    };
  
    fetchUserInfo();
  }, [user]); // Ajoutez `user` comme dépendance


  const formatDate = (dateString) => {
    return dateString.slice(0, 10);
  };
  const formattedDate = formatDate(userInfo.dateNaissance);


  // Fonction pour générer la facture en PDF
  const generatePDF = (facture) => {
    if (!facture) {
      return alert("La facture n'a pas de données.");
    }
  
    // Convertir total en nombre, puis vérifier que c'est un nombre valide
    const total = Number(facture.total);
    if (isNaN(total)) {
      return alert("Le total de la facture n'est pas un nombre valide.");
    }
  
    const doc = new jsPDF();
  
    // Formater le total avec deux décimales
    const totalFormatted = total.toFixed(2);
  
    // Générer le PDF avec les informations utilisateur et de facture
    // doc.text(`Facture ID: ${facture.id}`, 20, 20);

    const logo = '../logo camping.png'; // Remplacez par votre logo
    doc.addImage(logo, 'PNG', 10, 10, 50, 20); // (image, format, x, y, width, height)
    
    const image = '../nom camping.png'; // Remplacez par votre image d'entreprise
    doc.addImage(image, 'PNG', 105, 150, 80, 50); // (image, format, x, y, width, height)
    
    
    doc.text(`${userInfo.nom} ${userInfo.prenom}`, 20, 30);
    doc.text(`${userInfo.rue}, ${userInfo.codePostal} ${userInfo.ville}, ${userInfo.pays}`, 20, 40);
    doc.text(`${userInfo.mail}`, 20, 50);
    doc.text(`${formatDate(formattedDate)}`, 20, 60);
    doc.text(`${totalFormatted} €`, 20, 70);
  
    // Sauvegarder le PDF
    doc.save(`facture-${facture.id}.pdf`);
  };
  
  return (
    <div>      {factures.length === 0 ? (
        <p>Aucune facture disponible pour cet utilisateur.</p>
      ) : (
        <div>
          {factures.map((facture) => (
            <button
              key={facture.id}
              className="bubble-button"
              onClick={() => generatePDF(facture)}
            >
              <span className="line-one">Facture {formattedDate}</span>
              <span className="line-two">{facture.total} €</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenerateurFacture;