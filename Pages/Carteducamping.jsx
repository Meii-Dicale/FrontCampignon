import React from 'react';
import NavbarMonCompte from '../Composants/NavbarMonCompte';

function CarteCamping() {
  return (
    <>
      <NavbarMonCompte />
      <div className="container pt-5 mt-5">
        <h1>Carte du camping interactive</h1>
        <div
          style={{
            position: 'relative',
            width: '100%',  // Prendre toute la largeur de la fenêtre
            height: '80vh', // 80% de la hauteur de la fenêtre
            backgroundImage: "url('/Designer (1).jpeg')", // Image de fond
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Bouton 1 */}
          <div
            style={{
              position: 'absolute',
              top: '10%',  // Positionnement relatif à la hauteur de l'écran
              left: '10%', // Positionnement relatif à la largeur de l'écran
              width: '15vw', // Taille proportionnelle à la largeur de la fenêtre
              height: '15vw', // Taille proportionnelle à la largeur de la fenêtre
              background: "url('/mobile-home.jpeg') no-repeat center center",
              backgroundSize: 'cover',
              border: '3px solid white',
              borderRadius: '50%', // Circulaire
              cursor: 'pointer',
              textAlign: 'center', // Pour centrer le texte à l'intérieur du bouton
            }}
            onClick={() => window.location.href = '/mobile-home'}
            title="Mobile Home"
            className="interactive-button"
          >
            <span className="button-text">Mobile Home</span>
          </div>

          {/* Bouton 2 */}
          <div
            style={{
              position: 'absolute',
              top: '45%',
              left: '43%',
              width: '15vw', // Taille relative pour écrans plus petits
              height: '15vw', // Taille relative pour écrans plus petits
              background: "url('/tente.jpeg') no-repeat center center",
              backgroundSize: 'cover',
              border: '3px solid white',
              borderRadius: '50%',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={() => window.location.href = '/tente'}
            title="Tente"
            className="interactive-button"
          >
            <span className="button-text">Tente</span>
          </div>

          {/* Bouton 3 */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '75%',
              width: '15vw', // Taille relative pour écrans plus petits
              height: '15vw', // Taille relative pour écrans plus petits
              background: "url('/caravane.jpeg') no-repeat center center",
              backgroundSize: 'cover',
              border: '3px solid white',
              borderRadius: '50%',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={() => window.location.href = '/caravane'}
            title="Caravane"
            className="interactive-button"
          >
            <span className="button-text">Caravane</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarteCamping;