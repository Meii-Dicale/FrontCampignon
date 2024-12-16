import React, { useContext } from "react";
import AuthContext from '../src/Context/AuthContext';
import GenerateurFacture from "../Composants/GenerateurFacture";
import NavbarMonCompte from "../Composants/NavbarMonCompte";

const MesfacturesPage = () => {
  const { user } = useContext(AuthContext); // Récupérer les informations utilisateur du contexte

  if (!user || !user.id) { // Si l'utilisateur n'est pas connecté ou si l'ID de l'utilisateur est manquant
    return <div>Aucun utilisateur connecté.</div>;
  }

  return (
    <>
      <NavbarMonCompte />
      <div className="pt-5 mt-5">
        <h1>Mes Factures</h1>
        <GenerateurFacture utilisateurId={user.id} /> {/* Passer l'ID de l'utilisateur à GenerateurFacture */}
      </div>
    </>
  );
};

export default MesfacturesPage;