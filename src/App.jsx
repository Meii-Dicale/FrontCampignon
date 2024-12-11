import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import HomePage from '../Pages/HomePage';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes principales */}
        <Route path='/' element={<HomePage />} />
        <Route path='/inscription' element={<InscritpionPage />} />
        <Route path='/connexion' element={<ConnexionPage />} />
        <Route path='/compte' element={<MonComptePage />} />
        <Route path='/infos-personnel' element={<InfoPersonnelPage />} />
        <Route path='/facture' element={<MesFacturesPage />} />
        <Route path='/reservations' element={<MesReservationsPage />} />
        <Route path='/promo' element={<PromoPage />} />
        <Route path='/carte' element={<CarteDuCamping />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;