import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../src/Context/AuthContext';
import NavbarMonCompte from '../Composants/NavbarMonCompte';

function MesInfosPersonnel() {
  const { user } = useContext(AuthContext); // Récupérer l'utilisateur du contexte
  const [prenom, setPrenom] = useState('');

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3001/api/utilisateur/` +user.id)
        .then(response => setPrenom(response.data.prenom))
        .catch(() => setPrenom('Utilisateur'));
    }
  }, [user]);

  return (
    <>
      <NavbarMonCompte />
      <div className="container pt-5 mt-5">
        <h1>Bienvenue,  {prenom}</h1> {/* Affichage du prénom */}
        <img src="../Designer (1).jpeg" alt="Description de l'image" className="home"/>

      </div>
      
    </>
  );
}

export default MesInfosPersonnel;