import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Navbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import listeEmplacements from '../src/Services/apiServices';
import { useEffect, useState } from 'react';
import CarteEmplacement from '../Composants/CarteEmplacement';

const Reservation = () => {

// récupère la liste des emplacements pour générer les cards
    const [emplacements, setEmplacements] = useState([]);

useEffect(() => {
  const fetchEmplacements = async () => {
    try {
      const response = await listeEmplacements();
      console.log(response.data);
      setEmplacements(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des emplacements :', error);
      return [];
    }
  };
  fetchEmplacements();
}, []);

// affichage du contenu de la page
  return <>
      <Container>
        <Navbar />
        <Navbardroite />
        <Row className="mt-5">
          <Col md={8}>
            <Row>
                {emplacements.map((emplacement, index) => (
                <Col key="index" md={6} className='mb-4'>
                    <CarteEmplacement emplacement={emplacement} />
                </Col>
            ))}
            </Row>
          </Col>
          <Col md={4}>
            <div
              style={{
                border: '1px solid gray',
                height: '100%',
                padding: '10px',
              }}
            >
              Formulaire de sélection en fonction des disponibilités ou services
            </div>
          </Col>
        </Row>
      </Container>
      <footer className="mt-3">
        <Container>
          <Row>
            <Col className="text-center">
              Pied de page, informations de contact, liens réseaux.
            </Col>
          </Row>
        </Container>
      </footer>
    </>;
};

export default Reservation;
