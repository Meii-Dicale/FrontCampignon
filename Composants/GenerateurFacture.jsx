import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../src/Context/AuthContext';
import { jsPDF } from 'jspdf';
import moment from 'moment';

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
  
        const userResponse = await axios.get(`http://localhost:3001/api/utilisateur/` +user.id);
        const factureResponse = await axios.get(`http://localhost:3001/api/facture/utilisateur/` +user.id);
        
        //  informations utilisateur
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
  }, [user]); // dépendance


  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };


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
    doc.addImage(logo, 'PNG', 10, 10, 32, 35); // (image, format, x, y, width, height)
    
    const image = '../nom camping.png'; // Remplacez par votre image d'entreprise
    doc.addImage(image, 'PNG', 75, 10, 80, 25); // (image, format, x, y, width, height)
    
    
    doc.text(`${userInfo.prenom} ${userInfo.nom}`, 150, 60);
    doc.text(`${userInfo.rue}`, 150, 70);
    doc.text(`${userInfo.codePostal} ${userInfo.ville}`, 150, 80);
    doc.text(` ${userInfo.pays}`, 150, 90);
    // doc.text(`${userInfo.mail}`, 20, 50);
    doc.text(`${formatDate(facture.date_facture)}`, 20, 60);   
     doc.text(`${totalFormatted} €`, 150, 200);
     doc.setFontSize(28);
     doc.text(`Facture`, 93, 120);
  
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
 <span className="line-one">Facture du {moment(facture.date_facture).format('DD/MM/YYYY')}</span>              <span className="line-two">{facture.total} €</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenerateurFacture;