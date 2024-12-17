import { Container, Card } from 'react-bootstrap';
import MyNavbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import { listeServices } from '../src/Services/apiServices';
import React, { useEffect, useState } from'react';

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await listeServices();
        setServices(servicesData.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadServices();
  }, []);

  return (
    <>
      <MyNavbar />
      <Navbardroite />
      <Container className='mt-5'>
    <Card>    
    <Card.Title as={'h1'}>Services</Card.Title>
        <ul>
          {services.map((service) => (
            <li key={service.idService}>
              {service.libelle}: {service.tarif} €
            </li>
          ))}
        </ul>
        </Card>
      </Container>
    </>
  );
};

export default ServicesPage;
