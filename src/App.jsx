import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from '../Pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import InscritpionPage from '../Pages/InscriptionPage';
import ConnexionPage from '../Pages/ConnexionPage';
import MonComptePage from "../Pages/MoncomptePage";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MesFacturesPage from "../Pages/MesfacturesPage";
import MesReservationsPage from "../Pages/MesReservationsPage";
import PromoPage from '../Pages/PromoPage'
import CarteDuCamping from "../Pages/Carteducamping";
import InfoPersonnelPage from '../Pages/InfoPersonnelPage';
import ContactPage from '../Pages/ContactPage';

import DashboardAdmin from '../Pages/DashboardAdmin';
import Inscription from '../Pages/InscriptionPage';
import Login from '../Pages/Login';



import NavBarAdmin from '../Composants/NavbarAdmin';
import AuthContext from '../src/Context/AuthContext';
import AuthServices from './Services/AuthServices';
import CalendrierAdmin from '../Pages/CalendrierAdmin';

function Layout() {
  const location = useLocation();
  
  return (
    <>
      {/* Affiche une Navbar différente selon la page */}
      {location.pathname === '/' && (
        <>
          <Navbar />
          <Navbardroite />
        </>
      )}
      {location.pathname === '/DashboardAdmin' && <NavBarAdmin />}
      {location.pathname === '/CalendrierAdmin' && <NavBarAdmin />}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthServices.isValid());
  const [user, setUser] = useState(AuthServices.getUser());
  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('isAuthenticated:', isAuthenticated);
    if (token) {
      setIsAuthenticated(true);
      // Vous pouvez également récupérer les informations de l'utilisateur ici si nécessaire
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Inscription' element={<Inscription />} />
          <Route path='/CalendrierAdmin' element={<CalendrierAdmin />} />
          <Route path='/compte' element={<MonComptePage />} />
        <Route path='/infos-personnel' element={<InfoPersonnelPage />} />
        <Route path='/facture' element={<MesFacturesPage />} />
        <Route path='/reservations' element={<MesReservationsPage />} />
        <Route path='/promo' element={<PromoPage />} />
        <Route path='/carte' element={<CarteDuCamping />} />
        <Route path='/contact' element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;