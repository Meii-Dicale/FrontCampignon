import React, { useEffect, useState } from 'react';
import MyNavbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import Footer from '../Composants/footer';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { listeEmplacements, listeServices } from '../src/Services/apiServices';

const TarifsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [emplacements, setEmplacements] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadPromotions = async () => {
      // données de promotions insérées à la main
      const promoData = [
        {
          id: 1,
          title: 'Promotion 1',
          description: 'Profitez de 10% pour votre prochain séjour',
        },
        {
          id: 2,
          title: 'Promotion 2',
          description:
            'Réservez en avril ou en octobre et bénéficiez de 20% de réduction',
        },
        {
          id: 3,
          title: 'Promotion 3',
          description:
            'Accès gratuit au spa pour une réservation de 3 nuits ou plus',
        },
        {
          id: 4,
          title: 'Promotion 3',
          description:
            'Réduction pour les séjours en famille : -15% pour 4 personnes ou plus',
        },
      ];
      setPromotions(promoData);
    };
    const loadTarifs = async () => {
      try {
        const emplacementsData = await listeEmplacements();
        const servicesData = await listeServices();
        setEmplacements(emplacementsData.data);
        setServices(servicesData.data);
      } catch (error) {
        console.error('Erreur lors du chargement des tarifs:', error);
      }
    };
    loadPromotions();
    loadTarifs();
  }, []);

  console.log(services);

  return (
    <>
      <MyNavbar />
      <Navbardroite />
        <Container className="content-wrapper mt-5">
          <Row lg={2} md={1} >
            <Col md={6}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Tarifs</Card.Title>
                  <Card.Text>
                    Voici la liste des tarifs de nos emplacements:
                  </Card.Text>
                  <ul>
                    {emplacements.map((emplacement) => (
                      <li key={emplacement.idEmplacement}>
                        {emplacement.type}: {emplacement.tarif} €
                      </li>
                    ))}
                  </ul>
                  <Card.Text>
                    Voici la liste des tarifs de nos services:
                  </Card.Text>
                  <ul>
                    {services.map((service) => (
                      <li key={service.idService}>
                        {service.libelle}: {service.tarif} €
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ height: '100%' }} className='p-2'>
                <Card.Title className='m-3'>Promotions</Card.Title>
                <Row md={1} lg={2} className="g-4">
                  {Array.from(promotions).map((promo, index) => (
                    <Col key={index}>
                      <Card className='m-2'>
                        <Card.Body>
                          <Card.Title>{promo.title}</Card.Title>
                          <Card.Text>{promo.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      <Footer />
    </>
  );
};

export default TarifsPage;
