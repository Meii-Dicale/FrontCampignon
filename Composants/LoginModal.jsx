import { Modal, Button } from 'react-bootstrap';
import Login from '../Pages/Login';
import PropTypes from 'prop-types';

const LoginModal = ({ show, onHide, setShowLoginModal }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Connexion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login setShowLoginModal={setShowLoginModal} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  setShowLoginModal: PropTypes.func,
};
export default LoginModal;

