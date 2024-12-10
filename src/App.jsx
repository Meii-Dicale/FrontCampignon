import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"; // Importez useLocation ici
import HomePage from '../Pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "../Composants/Navbar";
import Navbardroite from "../Composants/Navbardroite";
import DashboardAdmin from "../Pages/DashboardAdmin";
import NavBarAdmin from "../Composants/NavbarAdmin";

function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Affiche une Navbar différente selon la page */}
      {location.pathname === "/" && (
        <>
          <Navbar />
          <Navbardroite />
        </>
      )}
      
      {location.pathname === "/DashboardAdmin" && <NavBarAdmin />}
    </>
  );
}

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
      {/* Affiche la Navbar et Navbardroite seulement si on n'est pas sur la page d'inscription ou de connexion */}
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