import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

// L'URL de l'API
const API_URL = "http://localhost:3001/api";

const GenerateurFacture = ({ factureId, utilisateurId }) => {
  const [facture, setFacture] = useState(null);
  const [utilisateur, setUtilisateur] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFacture = async (factureId) => {
      try {
        // Récupération des détails de la facture
        const factureResponse = await axios.get(`${API_URL}/factures/${factureId}`);
        setFacture(factureResponse.data);

        // Récupération des services associés à la facture
        const servicesResponse = await axios.get(`${API_URL}/factures/${factureId}/services`);
        setServices(servicesResponse.data);

        // Récupération des informations de l'utilisateur
        const utilisateurResponse = await axios.get(`${API_URL}/utilisateur/${factureResponse.data.utilisateur_id}`);
        setUtilisateur(utilisateurResponse.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des détails de la facture :", err);
        setError("Erreur lors de la récupération des détails de la facture.");
      }
    };

    const fetchFacturesByUtilisateur = async (utilisateurId) => {
      try {
        // Récupérer toutes les factures liées à l'utilisateur
        const response = await axios.get(`${API_URL}/factures/utilisateur/${utilisateurId}`);
        const factureData = response.data[0]; // Prenons la première facture comme exemple
        if (factureData) {
          await fetchFacture(factureData.id); // Appel de fetchFacture pour récupérer les détails complets
        } else {
          setError("Aucune facture trouvée pour cet utilisateur.");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des factures par utilisateur :", err);
        setError("Erreur lors de la récupération des factures par utilisateur.");
      }
    };

    // Vérification des paramètres pour décider quelle API appeler
    if (factureId) {
      fetchFacture(factureId);
    } else if (utilisateurId) {
      fetchFacturesByUtilisateur(utilisateurId);
    } else {
      setError("Aucun ID de facture ou d'utilisateur fourni.");
    }
  }, [factureId, utilisateurId]);

  const generatePDF = () => {
    if (!facture || !utilisateur || services.length === 0) {
      return alert("Les données nécessaires pour générer la facture sont manquantes !");
    }

    const total = parseFloat(facture.total);
    const totalFormatted = total.toFixed(2);

    const doc = new jsPDF();

    // Ajouter le logo (vérification de l'existence des images)
    const logoUrl = "../logo camping.png";
    const nomUrl = "../nom camping.png";
    try {
      doc.addImage(logoUrl, "PNG", 10, 10, 20, 25);
      doc.addImage(nomUrl, "PNG", 90, 17, 40, 15);
    } catch (err) {
      console.error("Erreur lors de l'ajout des images dans le PDF :", err);
    }

    // Ajouter les informations de la facture
    doc.text(`Facture ID : ${facture.id}`, 80, 100);
    doc.text(`Utilisateur : ${utilisateur.nom} ${utilisateur.prenom}`, 80, 110);
    doc.text(
      `Adresse : ${utilisateur.rue}, ${utilisateur.codePostal} ${utilisateur.ville}, ${utilisateur.pays}`,
      80,
      120
    );
    doc.text(`Date : ${new Date(facture.date_facture).toLocaleDateString()}`, 80, 130);
    doc.text(`Total : ${totalFormatted} €`, 80, 140);

    // Ajouter les services associés
    doc.text("Services associés : ", 10, 160);
    let yPosition = 170;
    services.forEach((service) => {
      doc.text(`${service.nom} - ${service.prix} €`, 10, yPosition);
      yPosition += 10;
    });

    // Sauvegarder le fichier PDF
    doc.save(`facture-${factureId || utilisateurId}.pdf`);
  };

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!facture || !utilisateur || services.length === 0) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <button className="bubble-button" onClick={generatePDF}>
        <span className="line-one">Facture {facture.id}</span>
        <span className="line-two">{facture.total} €</span>
      </button>
    </div>
  );
};

export default GenerateurFacture;