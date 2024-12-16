import React from "react";
import GenerateurFacture from "../Composants/GenerateurFacture";
import NavbarMonCompte from "../Composants/NavbarMonCompte";

const MesfacturesPage = ({ utilisateurId }) => {
  return <>
  <NavbarMonCompte />
    <div className="pt-5 mt-5">
      <h1>Mes Factures</h1>
      <GenerateurFacture utilisateurId={utilisateurId} />
    </div>
  </>
};

export default MesfacturesPage;