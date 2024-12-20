import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarMonCompte from '../Composants/NavbarMonCompte';

function PromoPage() {
  const [promotions, setPromotions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les promotions
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/promotion/toutes');
        
        setPromotions(response.data); // Met à jour les promotions
      } catch (err) {
        setError('Erreur lors de la récupération des promotions.');
        console.error(err);
      }
    };

    fetchPromotions();
  }, []);

  return <>

  <NavbarMonCompte />
    <div className="container pt-5 mt-5">
      <h1>Mes Offres</h1>

      {/* Affiche une erreur si elle existe */}
      {error && <p className="error">{error}</p>}

      {/* Affiche les promotions */}
      <div className="promotions">
        {promotions.map((promo) => (
          <div key={promo.idPromotion} className="promotion-card">
            <h2>{promo.libelle || 'Offre spéciale'}</h2>
            <p>Remise : {promo.typePromo || 'Non spécifié'}%</p>
            <p>Pour  {promo.contrainte || 'Aucune'} nuits</p>
          </div>
        ))}
      </div>
    </div>
    </>;
}

export default PromoPage;