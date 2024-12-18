import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { differenceInDays } from 'date-fns';

import MyNavbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import Footer from '../Composants/footer';

import AuthContext from '../src/Context/AuthContext';
import {
  listeServicesEmplacements,
  infosUtilisateur,
} from '../src/Services/apiServices';
import { resaParEmplacement } from '../src/Services/ReservationService';

const ValiderResa = () => {
  const user = useContext(AuthContext).user;
  const data = useLocation().state.emplacement;
  const [servicesLies, setServicesLies] = useState([]);
  const [client, setClient] = useState([]);
  const [selectionServices, setSelectionServices] = useState([]);
  const [dateEntree, setDateEntree] = useState(null);
  const [dateSortie, setDateSortie] = useState(null);
  const [datesNonLibres, setDatesNonLibres] = useState([]);

  useEffect(() => {
    // Récupère les services associés à un emplacement spécifique.
    const fetchServices = async () => {
      try {
        const response = await listeServicesEmplacements(data.idEmplacement);
        setServicesLies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Récupère les informations du client basées sur l'ID de l'utilisateur et met à jour l'état du client.
    const fetchClient = async () => {
      try {
        const response = await infosUtilisateur(user.id);
        setClient(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Récupère les dates disponibles pour l'emplacement spécifié.
    const fetchDatesLibres = async () => {
      try {
        const response = await resaParEmplacement(data.idEmplacement);
        const formatDate = response.data.map((resa) => ({
          start: new Date(resa.dateEntree).toISOString().split('T')[0],
          end: new Date(resa.dateSortie).toISOString().split('T')[0],
          display: 'background',
          backgroundColor: '#fd3030',
        }));
        setDatesNonLibres(formatDate);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDatesLibres();
    fetchClient();
    fetchServices();
  }, [data.emplacement]);

  // Cette fonction gère la sélection des dates pour une réservation.
  // Elle prend en paramètre un seul paramètre, `choixInfo`, qui est un objet contenant les dates de début et de fin de la sélection.
  // La fonction met à jour les variables d'état `dateEntree` et `dateSortie` avec les dates de début et de fin sélectionnées respectivement.
  const handleChoixDate = (choixInfo) => {
    const { startStr, endStr } = choixInfo;
    setDateEntree(startStr);
    setDateSortie(endStr);
  };

  // cette fonction gère la sélection d'une checkbox et vient ajouter/retirer le service coché de selectionServices
  const handleCheck = (service) => {
    if (selectionServices.includes(service)) {
      setSelectionServices(selectionServices.filter((chx) => chx !== service));
    } else {
      setSelectionServices([...selectionServices, service]);
    }
  };
  // Initialisation de nombreDeJours à null
  let nbJours = null;
  // Vérification si dateSortie et dateEntree sont des objets Date valides
  if (dateSortie && dateEntree) {
    // Calcul du nombre de jours
    nbJours = differenceInDays(new Date(dateSortie), new Date(dateEntree));
  }

  const montantTotal = selectionServices.reduce(
    (total, service) => total + service.tarif,
    nbJours !== null ? data.tarif * nbJours : data.tarif
  );

  console.log('client : ', client, 'data : ', data);
  if (selectionServices.length > 0) {
    console.log('services choisis', selectionServices);
  }
  if (datesNonLibres) {
    console.log(
      'dates OQP : ',
      datesNonLibres,
      'dateEntree',
      dateEntree,
      'dateSortie',
      dateSortie
    );
  }

  return (
    <>
      <MyNavbar />
      <Navbardroite />
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Récapitulatif de votre réservation</Card.Title>
                <Card.Text>
                  <div>
                    Nom : {client.prenom} {client.nom}
                  </div>
                  Contact : <br />
                  {client.mail} / {client.tel} <br />
                  Adresse :<br /> {client.rue},{client.codePostal}{' '}
                  {client.ville}
                </Card.Text>
                <Card.Text>
                  Services proposés :
                  <div className="d-flex justify-content-center">
                    {servicesLies.map((service, index) => (
                      <div key={index} className="mx-2">
                        <input
                          type="checkbox"
                          id={`service-${service.idService}`}
                          name={`service-${service.idService}`}
                          onChange={() => handleCheck(service)}
                        />
                        <label
                          className="mx-1"
                          htmlFor={`service-${service.idService}`}
                        >
                          {service.libelle} - {service.tarif}€
                        </label>
                      </div>
                    ))}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Validation des dates et options</Card.Header>
              <Card.Body>
                <Card.Text>
                  Emplacement : {data.type}, {data.tarif}€
                </Card.Text>
                <Card.Text>
                  Date de début : {dateEntree ? dateEntree : ''}
                </Card.Text>
                <Card.Text>
                  Date de fin : {dateSortie ? dateSortie : ''}
                </Card.Text>
                <Card.Text>
                  Services demandés :
                  {selectionServices
                    .map((service) => `${service.libelle} (${service.tarif}€)`)
                    .join(', ')}
                </Card.Text>
                <Card.Title>à régler : {montantTotal} €</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Sélection des Dates</Card.Title>
                <Form>
                  <Form.Group controlId="dateEntree">
                    <Form.Label>Arrivée</Form.Label>
                    <Form.Control
                      type="date"
                      value={dateEntree || ''}
                      onChange={(e) => setDateEntree(e.target.value)}
                      className="form-control"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="dateSortie">
                    <Form.Label>Départ</Form.Label>
                    <Form.Control
                      type="date"
                      value={dateSortie || ''}
                      onChange={(e) => setDateSortie(e.target.value)}
                      className="form-control"
                      required
                    />
                  </Form.Group>
                </Form>
                <FullCalendar
                  initialView="dayGridMonth"
                  plugins={[dayGridPlugin, interactionPlugin]}
                  selectable={true}
                  select={handleChoixDate}
                  validRange={{ start: new Date() }}
                  events={[
                    ...datesNonLibres.map((date) => ({
                      start: date.start,
                      end: date.end,
                      display: 'background',
                      backgroundColor: '#fd3030',
                    })),
                    ...(dateEntree && dateSortie
                      ? [
                          {
                            start: dateEntree,
                            end: dateSortie,
                            display: 'background',
                            backgroundColor: '#28a745',
                          },
                        ]
                      : []),
                  ]}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ValiderResa;
