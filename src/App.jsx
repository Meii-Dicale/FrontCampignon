import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import DashboardAdmin from '../Pages/DashboardAdmin';
import NavBarAdmin from '../Composants/NavbarAdmin';
import Inscription from '../Pages/InscriptionPage';
import AuthContext from '../Context/AuthContext';
import Login from '../Pages/Login';
import { useState, useEffect } from 'react';

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
