import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ValiderResa } from '../src/Services/ReservationService';
import { useNavigate } from 'react-router-dom';

const PayPalModal = ({ idReservation, montant, onClose }) => {
  const [showModal, setShowModal] = useState(true);
const navigate = useNavigate();

const handleClose = () => {
    setShowModal(false);
    onClose();
    navigate("/reservations")
  };

  const handleValidate = async () => {
    try {
    console.log(idReservation);
      await ValiderResa(idReservation);
      alert('Merci pour votre paiement. Votre réservation a été validée avec succès.');
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la validation de la réservation :', error);
      alert('Une erreur est survenue lors de la validation de votre réservation.');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Paiement PayPal en cours</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Veuillez patienter pendant que nous traitons votre paiement PayPal de {montant} €.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleValidate}>
          Valider
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PayPalModal;
