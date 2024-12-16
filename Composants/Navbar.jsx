import React, { useState, useContext, useEffect, useRef } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../src/Context/AuthContext';
import AuthServices from '../src/Services/AuthServices';
import LoginModal from './LoginModal';

function MyNavbar() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      if (user.role && user.role.includes('superadmin')) {
        navigate('/dashboardAdmin');
      }
    }
  }, [user, navigate]);

  const handleLogout = () => {
    AuthServices.logout();
  };

  return (
    <Navbar className="navbar" expand="lg">
      <Container className="d-flex justify-content-between w-100">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="../logo camping.png"
            alt="Logo"
            style={{ height: '60px' }}
          />
        </Navbar.Brand>

        <div className="d-flex flex-grow-1 justify-content-center">
          <img
            src="../nom camping.png"
            alt="Nom Camping"
            style={{ height: '40px' }}
          />
        </div>

        <Nav className="ms-auto d-flex align-items-center">
          {isAuthenticated ? (
            <>
              <Button
                href="/infos-personnel"
                variant='info'
              >
                Compte Utilisateur
              </Button>
              <Button
                onClick={handleLogout}
                variant='danger'
              >
                Déconnection
              </Button>
            </>
          ) : (
            <Nav.Link
              onClick={() => setShowLoginModal(true)}
              style={{ margin: '0 15px', color: 'black', fontWeight: '500' }}
            >
              Connection <br />
              Inscription
            </Nav.Link>
          )}
        </Nav>
      </Container>
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        setShowLoginModal={setShowLoginModal}
      />
    </Navbar>
  );
}

export default MyNavbar;
