import { Container, Card, Button, Row, Col, CardHeader } from 'react-bootstrap';

// trame de Card Bootstrap pour les emplacements, a destination de la page  Reservation
const CarteEmplacement = ({ emplacement }) => {
  const navigate = useNavigate();

  const handleReservation = () => {
    // Redirige vers la page de confirmation de réservation
    navigate('/confirmation', { state: { emplacement } });
  };

  return (
    <Container>
      <Card style={{ width: '25rem' }}>
        <CardHeader as="h5">
          {emplacement.type}
          {emplacement.numero}
        </CardHeader>
        <Card.Img variant="left" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{emplacement.tarif}</Card.Title>
          <Card.Text>{emplacement.description}</Card.Text>
          <Button variant="primary" onClick={handleReservation}>
            Réserver
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CarteEmplacement;
