import React from 'react';
import Navbar from '../Composants/Navbar';  
import Navbardroite from '../Composants/Navbardroite';

function HomePage() {
  return (
    <div>
      <Navbar />
      <Navbardroite />
  
      <div className="container">
      
      <img src="../Designer (1).jpeg" alt="Description de l'image" className="img-fluid home"/>

      </div>
    </div>
  );
}

export default HomePage;