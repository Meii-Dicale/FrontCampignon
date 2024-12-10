import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBarAdmin = () => {
  return (
    <div className="d-flex">
      {/* Barre de navigation */}
      <nav
        className="navbar navbar-expand-md navbar-light bg-light flex-md-column flex-row align-items-start py-2 px-3 vh-100 position-fixed"
        style={{ width: "250px" }}
      >
        <a className="navbar-brand mb-md-4" href="#">
          Campingnon
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarAdmin"
          aria-controls="navbarAdmin"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse flex-md-column"
          id="navbarAdmin"
        >
          <ul className="navbar-nav flex-column w-100">
            <li className="nav-item">
              <a className="nav-link" href="#dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#calendrier">
                Calendrier
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#emplacements">
                Emplacements
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#promotions">
                Promotions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#stocks">
                Stocks
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#finances">
                Finances
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#mon-compte">
                Mon compte
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-danger" href="#deconnexion">
                Déconnexion
              </a>
            </li>
          </ul>
        </div>
      </nav>

     
    </div>
  );
};

export default NavBarAdmin;
