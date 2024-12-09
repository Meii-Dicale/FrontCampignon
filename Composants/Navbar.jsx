import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function MyNavbar() {
  return (
    <Navbar className="nabar" expand="lg">
      <Container className="d-flex justify-content-between w-100">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="../logo camping.png" 
            alt="Logo"
            style={{ height: '60px'}} 
          />   
        </Navbar.Brand>

        <div className="d-flex flex-grow-1 justify-content-center">
          <img
            src="../nom camping.png" 
            alt="Nom Camping"
            style={{ height: '40px'}} 
          />
        </div>
        
        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link href="#home" style={{ margin: '0 15px', color: 'black', fontWeight: '500' }}>
            Compte Utilisateur
          </Nav.Link>
          <Nav.Link href="#home" style={{ margin: '0 15px', color: 'black', fontWeight: '500' }}>
            Inscription
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;