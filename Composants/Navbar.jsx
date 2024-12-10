import { useState, useContext, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import AuthContext from '../Context/AuthContext';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
  const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role.includes('superadmin')) {
      navigate('/dashboardAdmin');
    }
  }, [user, navigate]);

  return (
    <Navbar className="nabar" expand="lg">
      <Container className="d-flex justify-content-between w-100">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
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
            <Nav.Link
              href="#home"
              style={{ margin: '0 15px', color: 'black', fontWeight: '500' }}
            >
              Compte Utilisateur
            </Nav.Link>
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
