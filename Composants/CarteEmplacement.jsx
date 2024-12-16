import { Container, Card, Button, CardHeader } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { photoEmplacement } from '../src/Services/apiServices';

// trame de Card Bootstrap pour les emplacements, a destination de la page  Reservation
const CarteEmplacement = ({ emplacement }) => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  // appel du lien pour la photo
  const fetchurl = async () => {
    try {
      const srvcall = await photoEmplacement(emplacement.idEmplacement);
      setUrl(srvcall.data[0].chemin);
    } catch (error) {
      console.error('Erreur lors de la récupération de la photo : ', error);
    }
  };
  fetchurl();

  const handleReservation = () => {
    // Redirige vers la page de confirmation de réservation
    navigate('/confirmation', { state: { emplacement } });
  };
  console.log('url : ' + url);
  return (
    <Container>
      <Card className="w-100">
        <CardHeader as="h5">{emplacement.type}</CardHeader>
        <Card.Img variant="left" src={`${url}`} alt={emplacement.type} />
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
