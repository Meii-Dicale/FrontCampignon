import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"; // Importez useLocation ici
import HomePage from '../Pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import InscritpionPage from '../Pages/InscriptionPage';
import ConnexionPage from '../Pages/ConnexionPage';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isInscriptionPage = location.pathname === '/inscription';
  const isConnexionPage = location.pathname === '/connexion';

  return (
    <>
      {/* Affiche la Navbar seulement si on n'est pas sur la page d'inscription */}
      {!isInscriptionPage && !isConnexionPage && <Navbar />}
      {!isInscriptionPage && !isConnexionPage && <Navbardroite />}      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/inscription' element={<InscritpionPage />} />
        <Route path='/connexion' element={<ConnexionPage />} />
      </Routes>
    </>
  );
}

export default App;