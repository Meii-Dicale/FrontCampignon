import React from 'react';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import AuthServices from '../src/Services/AuthServices';


  const handleLogout = () => {
    AuthServices.logout();
    Navigate("/");
  };


function NavbarMonCompte() {
  return (
    <Navbar className="navbar" expand="lg" style={{ zIndex: 1000 }}>
      <Container className="d-flex justify-content-between w-100">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="../logo camping.png"
            alt="Logo"
            style={{ height: '60px' }}
          />
        </Navbar.Brand>

        <div className="d-flex justify-content-center">
          <img
            src="../nom camping.png"
            alt="Nom Camping"
            style={{ height: '40px' }}
          />
        </div>

        <Nav className="ms-auto d-flex align-items-center">
          {/* Menu déroulant pour Info Personnel */}
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              style={{
                color: 'black',
                fontWeight: '500',
                textDecoration: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                margin: '0 15px',
              }}
            >
              Mon compte
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                position: 'absolute',
                top: '100%', // Place le menu juste en dessous du bouton
                left: 0,
                zIndex: 1050, // Assure que le menu s'affiche au-dessus
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Dropdown.Item as={Link} to="/infos-personnel">
                Mes infos personnel
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/facture">
                Mes factures
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/reservations">
                Mes réservations
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/promo">
                Mes offres
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/carte">
                Carte du camping
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>

        <Nav className="ms-auto d-flex align-items-center">
          <Link
            to="/contact"
            style={{
              margin: '0 15px',
              color: 'black',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            Contact
          </Link>
        </Nav>
        <Nav className="ms-auto d-flex align-items-center">
          <Link
            to="/"
            style={{
              margin: '0 15px',
              color: 'black',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            Accueil
          </Link>
        </Nav>
<Nav className="ms-auto d-flex align-items-center">
        <Button
                onClick={handleLogout}
                variant='danger'
              >
                Déconnexion
              </Button>
</Nav>


        {/* <Nav className="ms-auto d-flex align-items-center">
          <Link
            to="/"
            style={{
              margin: '0 15px',
              color: 'black',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            Déconnexion
          </Link>
        </Nav> */}
      </Container>
    </Navbar>
  );
}

export default NavbarMonCompte;