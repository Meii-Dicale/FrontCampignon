import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import CarteDuCamping from '../Pages/Carteducamping';
import CalendrierAdmin from '../Pages/CalendrierAdmin';
import ContactPage from '../Pages/ContactPage';
import DashboardAdmin from '../Pages/DashboardAdmin';
import EmplacementsAdminPage from '../Pages/EmplacementAdminPage';
import EmplacementDetail from '../Pages/DetailEmplacementAdmin';
import GalleriePage from '../Pages/GalleriePage';
import HomePage from '../Pages/HomePage';
import InfoPersonnelPage from '../Pages/InfopersonnelPage';
import Inscription from '../Pages/InscriptionPage';
import Login from '../Pages/Login';
import MonComptePage from '../Pages/MoncomptePage';
import MesFacturesPage from '../Pages/MesfacturesPage';
import MesReservationsPage from '../Pages/MesReservationsPage';
import PromoPage from '../Pages/PromoPage';
import ReservationPage from '../Pages/ReservationPage';
import ServicesPage from '../Pages/ServicesPage';
import TarifsPage from '../Pages/TarifsPage';
import Navbar from '../Composants/Navbar';
import NavBarAdmin from '../Composants/NavbarAdmin';
import Navbardroite from '../Composants/Navbardroite';
import AuthContext from '../src/Context/AuthContext';
import AuthServices from './Services/AuthServices';
import AjoutEmplacement from '../Pages/AjoutEmplacement';
import AjoutService from '../Pages/AjoutServices';
import ArchiveReservation from '../Pages/ArchiveReservations';
import ArchiveMessages from '../Pages/ArchivesMessages';
import StockAdminPage from '../Pages/StockAdminPage';
import FinanceAdminPage from '../Pages/FinanceAdminPage';
import InscriptionAgent from '../Pages/AjoutAgen';
import PromotionAdmin from '../Pages/PromotionAdmin';
import ReservationDetails from '../Pages/ReservationDetailPage';
import PrivateRoute from './Services/RouteProtection';
import ValiderResaPage from '../Pages/ValiderResaPage.jsx';
import ContactezNousPage from '../Pages/ContactezNous.jsx';
import PaiementPage from '../Pages/PaiementPage';


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
      {location.pathname.includes('Admin') && <NavBarAdmin />}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthServices.isValid()
  );
  const [user, setUser] = useState(AuthServices.getUser());

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('isAuthenticated:', isAuthenticated);
    if (token) {
      setIsAuthenticated(true);
      const readToken = AuthServices.getUser();
      if (readToken) {
        setUser(readToken);
      }
      console.log('token lu :', readToken);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const interval = setInterval(() => {
      const isValid = AuthServices.isValid();
      if (!isValid) {
        AuthServices.logout();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/carte" element={<CarteDuCamping />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/Reserver" element={<ReservationPage />} />
          <Route path="/Gallerie" element={<GalleriePage />} />
          <Route path='/Tarifs' element={<TarifsPage />} />
          <Route path='/Services' element={<ServicesPage />} />
          <Route path='/ContactezNous' element={<ContactezNousPage />} />

{/* devrait etre accessible à role client mimimum */}
<Route path="/compte" element={<PrivateRoute element={<MonComptePage />} allowedRoles={['client','superadmin','rh','agent']} /> }/> 
<Route path="/infos-personnel" element={<PrivateRoute element={<InfoPersonnelPage />} allowedRoles={['client','superadmin','rh','agent']}/>} /> 
<Route path="/facture"  element={<PrivateRoute element={<MesFacturesPage />} allowedRoles={['client','superadmin','rh','agent']}/>} /> 
<Route path="/reservations"  element={<PrivateRoute element={<MesReservationsPage />} allowedRoles={['client']}/>} /> 
<Route path="/valider"  element={<PrivateRoute element={<ValiderResaPage />} allowedRoles={['client','superadmin','rh','agent']}/>} />  
<Route path="/paiement" element={<PrivateRoute element={<PaiementPage />} allowedRoles={['client','superadmin','rh','agent']}/>} />

          {/* Routes accessibles à tous */}
          <Route
            path="/DashboardAdmin"
            element={
              <PrivateRoute
                element={<DashboardAdmin />}
                allowedRoles={['superadmin', 'rh', 'agent']}
              />
            }
          />
          <Route
            path="/emplacementsAdmin"
            element={
              <PrivateRoute
                element={<EmplacementsAdminPage />}
                allowedRoles={['superadmin', 'rh', 'agent']}
              />
            }
          />
          <Route
            path="/emplacementsAdmin/:id"
            element={
              <PrivateRoute
                element={<EmplacementDetail />}
                allowedRoles={['superadmin', 'rh', 'agent']}
              />
            }
          />
          <Route
            path="/AjouterEmplacementAdmin"
            element={
              <PrivateRoute
                element={<AjoutEmplacement />}
                allowedRoles={['superadmin', 'rh', 'agent']}
              />
            }
          />
          <Route
            path="/AjouterServiceAdmin"
            element={
              <PrivateRoute
                element={<AjoutService />}
                allowedRoles={['superadmin', 'rh', 'agent']}
              />
            }
          />
          <Route
            path="/ArchivesReservationAdmin"
            element={
              <PrivateRoute
                element={<ArchiveReservation />}
                allowedRoles={['superadmin', 'rh', 'agent']}
              />
            }
          />
          <Route
            path="/CalendrierAdmin"
            element={
              <PrivateRoute
                element={<CalendrierAdmin />}
                allowedRoles={['superadmin', 'rh', 'agent']}
              />
            }
          />
          <Route
            path="/reservationAdmin/:idReservation"
            element={
              <PrivateRoute
                element={<ReservationDetails />}
                allowedRoles={['superadmin', 'rh', 'agent']}
              />
            }
          />

          {/* Routes réservées à 'superadmin' et/ou 'rh'*/}
          <Route
            path="/ArchivesMessagesAdmin"
            element={
              <PrivateRoute
                element={<ArchiveMessages />}
                allowedRoles={['superadmin']}
              />
            }
          />
          <Route
            path="/stocksAdmin"
            element={
              <PrivateRoute
                element={<StockAdminPage />}
                allowedRoles={['superadmin', 'rh']}
              />
            }
          />
          <Route
            path="/FinanceAdminPage"
            element={
              <PrivateRoute
                element={<FinanceAdminPage />}
                allowedRoles={['superadmin', 'rh']}
              />
            }
          />
          <Route
            path="/InscriptionAdmin"
            element={
              <PrivateRoute
                element={<InscriptionAgent />}
                allowedRoles={['superadmin']}
              />
            }
          />
          <Route
            path="/PromotionAdmin"
            element={
              <PrivateRoute
                element={<PromotionAdmin />}
                allowedRoles={['superadmin']}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
