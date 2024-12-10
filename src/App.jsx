import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../Pages/HomePage";
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
      <Layout />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
