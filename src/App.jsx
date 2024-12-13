import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import CarteDuCamping from "../Pages/Carteducamping";
import CalendrierAdmin from '../Pages/CalendrierAdmin';
import ContactPage from '../Pages/ContactPage';
import DashboardAdmin from '../Pages/DashboardAdmin';
import EmplacementsAdminPage from '../Pages/EmplacementAdminPage';
import EmplacementDetail from '../Pages/DetailEmplacementAdmin';
import GalleriePage from '../Pages/GalleriePage';
import HomePage from '../Pages/HomePage';
import InfoPersonnelPage from '../Pages/InfoPersonnelPage';
import Inscription from '../Pages/InscriptionPage';
import Login from '../Pages/Login';
import MonComptePage from "../Pages/MoncomptePage";
import MesFacturesPage from "../Pages/MesfacturesPage";
import MesReservationsPage from "../Pages/MesReservationsPage";
import PromoPage from '../Pages/PromoPage'
import ReservationPage from '../Pages/ReservationPage';

import Navbar from '../Composants/Navbar';
import NavBarAdmin from '../Composants/NavbarAdmin';
import Navbardroite from '../Composants/Navbardroite';

import AuthContext from '../src/Context/AuthContext';

import AuthServices from './Services/AuthServices';


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
      {location.pathname.includes('/emplacementsAdmin') && <NavBarAdmin />}
      
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthServices.isValid());
  const [user, setUser] = useState(AuthServices.getUser());

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
        <Route path='/Reservation' element={<ReservationPage />} />
        <Route path='/Gallerie' element={<GalleriePage />} />
          <Route path='/emplacementsAdmin' element={<EmplacementsAdminPage />} />
          <Route path='/emplacementsAdmin/:id' element={<EmplacementDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;