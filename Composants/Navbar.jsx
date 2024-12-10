import { useState, useContext, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import AuthServices from '../Services/AuthServices';
import LoginModal from './LoginModal';

function MyNavbar() {
  const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role.includes('superadmin')) {
      navigate('/dashboardAdmin');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    AuthServices.logout();
  };

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
            <>
              <Nav.Link
                href="#home"
                style={{ margin: '0 15px', color: 'black', fontWeight: '500' }}
              >
                Compte Utilisateur
              </Nav.Link>
              <Nav.Link
                onClick={handleLogout}
                style={{ margin: '0 15px', color: 'red', fontWeight: '500' }}
              >
                <X size={24} />
              </Nav.Link>
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
