import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from '../Pages/HomePage';
import DashboardAdmin from '../Pages/DashboardAdmin';
import Inscription from '../Pages/InscriptionPage';
import Login from '../Pages/Login';
import ConnexionPage from '../Pages/ConnexionPage';
import Navbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import NavBarAdmin from '../Composants/NavbarAdmin';
import AuthContext from '../Context/AuthContext';

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
    </>
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  const [user, setUser] = useState(null);

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
        <AppContent />
        <Layout />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Inscription' element={<Inscription />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;