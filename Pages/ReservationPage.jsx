import { Container, Form, ListGroup, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Navbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import {
  listeEmplacements,
  listeServices,
  listeServicesEmplacements,
} from '../src/Services/apiServices';
import CarteEmplacement from '../Composants/CarteEmplacement';

const Reservation = () => {
  const [filtres, setFiltres] = useState({
    types: [],
    services: [],
  }); // filtres pour le formulaire
  const [emplacements, setEmplacements] = useState([]); // récupère la liste des emplacements pour générer les cards
  const [services, setServices] = useState([]); // liste des services
  const [emplacementsFiltres, setEmplacementsFiltres] = useState([]); // filtrages
  const [counts, setCounts] = useState({types: {}, services: {}}); // comptage des résultats

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEmplacements = await listeEmplacements();
        const emplacementsData = resEmplacements.data;

        const resServices = await listeServices();
        const servicesData = resServices.data;

        const typesCount = {};
        const servicesCount = {};

        emplacementsData.forEach((emplacement) => {
          typesCount[emplacement.type] = (typesCount[emplacement.type] || 0) + 1;
        });
        servicesData.forEach((service) => {
          servicesCount[service.libelle] = (servicesCount[service.libelle] || 0) +1;
        });

        setCounts((prevCounts) => ({
          ...prevCounts,
          types: typesCount,
          services: servicesCount,
        }));

        setEmplacements(emplacementsData);
        setEmplacementsFiltres(emplacementsData);
        setServices(servicesData);

      } catch (error) {
        console.error(
          'Erreur lors de la récupération des emplacements :',
          error
        );
      }
    };
    fetchData();
  }, []);


useEffect(() => {
  const filtrage = async () => {
    const filtré = await Promise.all(
      emplacements.map(async (emplacement) => {
        console.log('emplacement :', emplacement.idEmplacement);
        const resServicesEmplacements = await listeServicesEmplacements(emplacement.idEmplacement);
        const servicesEmplacements = resServicesEmplacements.data.map((service) => service.libelle);
        console.log('servicesEmplacements', servicesEmplacements);

        const correspondanceTypes = filtres.types.length === 0 || filtres.types.includes(emplacement.type);
        const correspondanceServices = filtres.services.length === 0 || filtres.services.every((service) => servicesEmplacements.includes(service));

        if (correspondanceTypes && correspondanceServices) {
          return emplacement;
        } else {
          return null;
        }
      })
    );
    setEmplacementsFiltres(filtré.filter(Boolean));
  };
  filtrage();
  }, [filtres, emplacements]);
  
  const handleCheckChange = (e) => {
    const { name, value, checked } = e.target;
    setFiltres((prevFiltres) => {
      if (prevFiltres[name]) {
        if (checked) {
          return { ...prevFiltres, [name]: [...prevFiltres[name], value] };
        } else {
          return {
            ...prevFiltres,
            [name]: prevFiltres[name].filter((item) => item !== value),
        };
      }
    } else { 
      return { ...prevFiltres, [name]: [value]};
    }
    });
  };

console.log('filtres', filtres);
console.log('emp filtres :', emplacementsFiltres)
console.log('counts ',counts);
  // affichage du contenu de la page
  return (
    <>
      <Container>
        <Navbar />
        <Navbardroite />
        <Row className="mt-5">
          <Col md={8}>
              <Row>{emplacementsFiltres.map((emplacement, index) => (
                <Col key={index} md={6} className="mt-4">
                  <CarteEmplacement emplacement={emplacement} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <Card className="mt-5 bg-light" style={{ padding:'10px', borderRadius:'5px'}} data-bs-theme="light">
              <Card.Header as={'h4'} style={{borderRadius:'5px'}}>Recherche avancée</Card.Header>
              <Form>
                <ListGroup>
                  <ListGroup.Item>
                  <Form.Group controlId="types">
                    <Form.Label>Types d'emplacement</Form.Label>
                    {Object.keys(counts.types).map((type) => (
                      console.log('emplacement',type),
                      <div key={type} className='d-flex justify-content-between align-items-center'> 
                       <Form.Check
                        type="checkbox"
                        name="types"
                        value={type}
                        label={type}
                        onChange={handleCheckChange}
                        style={{marginLeft:'10px', textAlign:'center'}}
                      />
                      <small className='text-muted'>({counts.types[type]})</small>
                      </div>
                    ))}
                  </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Form.Group controlId="services">
                    <Form.Label>Services</Form.Label>
                    {services.map((service) => (
                      console.log('service',service),
                      <div key={service.idService} className="d-flex justify-content-between align-items-center">
                      <Form.Check
                        key={service.idService}
                        type="checkbox"
                        name="services"
                        value={service.libelle}
                        label={`${service.libelle} : ${service.tarif}`}
                        onChange={handleCheckChange}
                        style={{marginLeft:'10px', textAlign:'center'}}
                      />
                      <small className='text-muted'>({counts.services[service.libelle]})</small>
                      </div>
                    ))}
                  </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
                {/* <Button variant="primary" type="submit">
                  Rechercher
                </Button> */}
              </Form>
            </Card>
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
    </>
  );
};

export default Reservation;
