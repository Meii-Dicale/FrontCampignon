import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import PayPalModal from "../Composants/PaypalModal";

const PaiementPage = () => {
  const location = useLocation();
  const { reservation,idReservation, montant, services, promotions } = location.state;
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
console.log('pagepaiement',idReservation)
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayPalPayment = () => {
    setShowPayPalModal(true);
  };

  const handleOnSitePayment = () => {
    alert('Paiement sur place confirmé. Merci de régler le montant de ' + montant + ' €.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentMethod === 'paypal') {
      handlePayPalPayment();
    } else if (paymentMethod === 'onsite') {
      handleOnSitePayment();
    } else {
      alert('Veuillez choisir un mode de paiement.');
    }
  };

  const handleClosePayPalModal = () => {
    setShowPayPalModal(false);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Détails de la réservation</Card.Title>
              <Card.Text>
                <div>Montant total : {montant} €</div>
                <div>Arrivée le : {reservation.dateEntree}</div>
                <div>Départ le : {reservation.dateSortie}</div>
                <div>Services : {services.map(service => service.libelle).join(', ')}</div>
                <div>Promotions : {promotions.map(promo => promo.libelle).join(', ')}</div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Choisissez votre mode de paiement</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="paymentMethod">
                  <Form.Label>Mode de paiement</Form.Label>
                  <Form.Control
                    as="select"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    required
                  >
                    <option value="">Choisissez un mode de paiement</option>
                    <option value="paypal">PayPal</option>
                    <option value="onsite">Paiement sur place</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Confirmer le paiement
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {showPayPalModal && <PayPalModal idReservation={idReservation} montant={montant} onClose={handleClosePayPalModal} />}
    </Container>
  );
};

export default PaiementPage;
