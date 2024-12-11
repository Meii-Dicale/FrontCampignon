import React from 'react';
import { Container } from 'react-bootstrap';
import NavbarMonCompte from '../Composants/NavbarMonCompte';

function MesOffresPage() {
  return (
    <>
      <NavbarMonCompte />
      <Container fluid className="pt-5 mt-5">
        {/* Titre de la page */}
        <h1 className="text-center mb-4">Mes Offres</h1>

        {/* Section des bulles d'offres */}
        <div className="offers-bubbles d-flex flex-wrap justify-content-center gap-3 p-3">
          <div className="offer-bubble">
            <p className="offer-text">Profitez de 10% pour votre prochain séjour</p>
          </div>
          <div className="offer-bubble">
            <p className="offer-text">Réservez en avril ou en octobre et bénéficiez de 20% de réduction</p>
          </div>
          <div className="offer-bubble">
            <p className="offer-text">Accès gratuit au spa pour une réservation de 3 nuits ou plus</p>
          </div>
          <div className="offer-bubble">
            <p className="offer-text">Réduction pour les séjours en famille : -15% pour 4 personnes ou plus</p>
          </div>
        </div>
        <h2 className="text-center mb-4">Offres non cumulables</h2>

      </Container>
    </>
  );
}

export default MesOffresPage;