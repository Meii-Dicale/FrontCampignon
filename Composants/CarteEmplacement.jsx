import { Container, Card, Button, Row, Col, CardHeader } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// trame de Card Bootstrap pour les emplacements, a destination de la page  Reservation
const CarteEmplacement = ({ emplacement }) => {
  const navigate = useNavigate();

  const handleReservation = () => {
    // Redirige vers la page de confirmation de réservation
    navigate('/confirmation', { state: { emplacement } });
  };

  return (
    <Container>
      <Card className='w-100'>
        <CardHeader as="h5">
          {emplacement.type}
        </CardHeader>
        <Card.Img variant="left" src={`../src/assets/${emplacement.type}.png`} alt={emplacement.type} />
        <Card.Body>
          <Card.Title>{emplacement.tarif} €</Card.Title>
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
