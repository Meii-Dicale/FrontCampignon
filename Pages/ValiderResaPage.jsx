import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import moment from 'moment';

import MyNavbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import Footer from '../Composants/footer';

import AuthContext from '../src/Context/AuthContext';
import { listeServicesEmplacements, infosUtilisateur } from '../src/Services/apiServices';
import { ajouterResa, resaParEmplacement } from '../src/Services/ReservationService';
import { fetchPromo } from '../src/Services/PromosServices';

const ValiderResa = () => {
  const navigate = useNavigate();
  const user = useContext(AuthContext).user;
  const data = useLocation().state.emplacement;
  const [servicesLies, setServicesLies] = useState([]);
  const [client, setClient] = useState([]);
  const [selectionServices, setSelectionServices] = useState([]);
  const [dateEntree, setDateEntree] = useState(null);
  const [dateSortie, setDateSortie] = useState(null);
  const [datesNonLibres, setDatesNonLibres] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [promosApplicables, setPromosApplicables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, clientRes, resaRes, promosRes] = await Promise.all([
          listeServicesEmplacements(data.idEmplacement),
          infosUtilisateur(user.id),
          resaParEmplacement(data.idEmplacement),
          fetchPromo(),
        ]);

        setServicesLies(servicesRes.data); // Récupère les services associés à un emplacement spécifique.
        setClient(clientRes.data); // Récupère les informations du client basées sur l'ID de l'utilisateur et met à jour l'état du client.
        setPromotions(promosRes.data); // Récupère les promos

        const formatDate = resaRes.data.map((resa) => ({
          // formatage des dates.
          start: moment(resa.dateEntree).format('YYYY-MM-DD'),
          end: moment(resa.dateSortie).format('YYYY-MM-DD'),
          display: 'background',
          BackgroundColor: '#fd3030',
          selectable: false
        }));
        console.log(formatDate);
        setDatesNonLibres(formatDate);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [data.emplacement, user.id]);

  useEffect(() => {
    if (dateEntree && dateSortie && selectionServices) {
      const nbJours = Math.max(1, moment(dateSortie).diff(moment(dateEntree), 'days'));
      const promos = promotions.filter((promo) => {
        const serviceConditionRemplie =
          !promo.idService || selectionServices.some((s) => s.idService === promo.idService);
        const dureeConditionRemplie = nbJours >= promo.contrainte;
        return serviceConditionRemplie && dureeConditionRemplie;
      });
      setPromosApplicables(promos);
    }
  }, [dateEntree, dateSortie, selectionServices, promotions]);

  // Cette fonction gère la sélection des dates pour une réservation.
  // Elle prend en paramètre un seul paramètre, `choixInfo`, qui est un objet contenant les dates de début et de fin de la sélection.
  // La fonction met à jour les variables d'état `dateEntree` et `dateSortie` avec les dates de début et de fin sélectionnées respectivement.
  const handleChoixDate = (choixInfo) => {
    const newDateEntree = moment(choixInfo.startStr).set({
      hour: 14,
      minute: 0,
    });
    const newDateSortie = moment(choixInfo.endStr).set({ hour: 11, minute: 0 });

    // Vérifiez si les dates sélectionnées chevauchent une réservation existante
    const datesValides = (start, end) => {
      return !datesNonLibres.some((resa) => {
        const debutResa = moment(resa.start);
        const finResa = moment(resa.end);
        const chevauche = start.isSame(end, 'day') && start.hour(14) && end.hour(11);
        return (
          (start.isBetween(debutResa, finResa, 'minute', '[]') ||
            end.isBetween(debutResa, finResa, 'minute', '[]') ||
            debutResa.isBetween(start, end, 'minute', '[]')) &&
          !chevauche
        );
      });
    };

    if (datesValides(newDateEntree, newDateSortie)) {
      setDateEntree(newDateEntree);
      setDateSortie(newDateSortie);
    } else {
      alert('Les dates sélectionnées chevauchent une réservation existante, veuillez choisir une période libre');
    }
  };

  // cette fonction gère la sélection d'une checkbox et vient ajouter/retirer le service coché de selectionServices
  const handleCheck = (service) => {
    setSelectionServices((prev) =>
      prev.includes(service) ? prev.filter((serv) => serv !== service) : [...prev, service]
    );
  };

  const calculTotal = () => {
    if (!dateEntree || !dateSortie) return 0;
    const nbJours = moment(dateSortie).diff(moment(dateEntree), 'days') + 1;
    let montant = data.tarif * nbJours;
console.log('JOURS ',nbJours);
    // ajout des services cochés
    montant += selectionServices.reduce((total, service) => total + service.tarif, 0);

    if (promosApplicables.length > 0) {
      const promo = promosApplicables.map((p) => p.type);
      montant = montant * (1 - promo / 100);
    }
    return montant;
  };

  const handleSubmit = async () => {
    try {
      if (promosApplicables.length === 0) {
        const reservationData = {
          dateEntree: moment(dateEntree).format('YYYY-MM-DD[T]HH:mm'),
          dateSortie: moment(dateSortie).format('YYYY-MM-DD[T]HH:mm'),
          idUtilisateur: user.id, // Utilisation de l'ID de l'utilisateur du contexte
          idEmplacement: data.idEmplacement,
          idPromotion: null,
        };

        const resp = await ajouterResa(reservationData);
        navigate('/paiement', {
          state: {
            reservation: resp,
            montant: calculTotal(),
          },
        });
      } else {
        const reservationEnvois = promosApplicables.map((promo) => {
          const reservationData = {
            dateEntree: moment(dateEntree).format('YYYY-MM-DD[T]HH:mm'),
            dateSortie: moment(dateSortie).format('YYYY-MM-DD[T]HH:mm'),
            idUtilisateur: user.id, // Utilisation de l'ID de l'utilisateur du contexte
            idEmplacement: data.idEmplacement,
            idPromotion: promo.idPromotion,
          };
          return ajouterResa(reservationData);
        });

        const reservationData = await Promise.all(reservationEnvois);
        navigate('/paiement', {
          state: {
            reservation: resp,
            montant: calculTotal(),
          },
        });
      }
    } catch (e) {
      console.error('Erreur lors de la réservation : ', e);
    }
  };

  console.log('client : ', client, 'data : ', data);
  if (datesNonLibres) {
    console.log('dates OQP : ', datesNonLibres, 'dateEntree', dateEntree, 'dateSortie', dateSortie);
  }

  return (
    <>
      <MyNavbar />
      <Navbardroite />
      <Container className='mt-5'>
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
                  Adresse :<br /> {client.rue},{client.codePostal} {client.ville}
                </Card.Text>
                <Card.Text>
                  Services proposés :
                  <div className='d-flex justify-content-center'>
                    {servicesLies.map((service, index) => (
                      <div key={index} className='mx-2'>
                        <input
                          type='checkbox'
                          id={`service-${service.idService}`}
                          name={`service-${service.idService}`}
                          onChange={() => handleCheck(service)}
                        />
                        <label className='mx-1' htmlFor={`service-${service.idService}`}>
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
                <Card.Text>Date de début : {dateEntree ? moment(dateEntree).format('YYYY-MM-DD HH:mm') : ''}</Card.Text>
                <Card.Text>Date de fin : {dateSortie ? moment(dateSortie).format('YYYY-MM-DD HH:mm') : ''}</Card.Text>
                <Card.Text>
                  Services demandés :
                  {selectionServices.map((service) => `${service.libelle} (${service.tarif}€)`).join(', ')}
                </Card.Text>
                <Card.Title>à régler : {calculTotal()} €</Card.Title>
                <Button className='mt-3' variant='primary' onClick={handleSubmit} disabled={!dateEntree || !dateSortie}>
                  Procéder au paiement
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Sélection des Dates</Card.Title>
                <Form>
                  <Form.Group controlId='dateEntree'>
                    <Form.Label>Arrivée</Form.Label>
                    <Form.Control
                      type='datetime-local'
                      value={dateEntree ? moment(dateEntree).format('YYYY-MM-DD[T]14:00') : ''}
                      onChange={(e) => setDateEntree(moment(e.target.value).format('YYYY-MM-DD[T]11:00'))}
                      className='form-control'
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId='dateSortie'>
                    <Form.Label>Départ</Form.Label>
                    <Form.Control
                      type='datetime-local'
                      value={dateSortie ? moment(dateSortie).format('YYYY-MM-DD[T]11:00') : ''}
                      onChange={(e) => setDateSortie(moment(e.target.value).format('YYYY-MM-DD[T]11:00'))}
                      className='form-control'
                      required
                    />
                  </Form.Group>
                </Form>
                <FullCalendar
                  initialView='dayGridMonth'
                  plugins={[dayGridPlugin, interactionPlugin]}
                  selectable={true}
                  select={handleChoixDate}
                  validRange={{ start: new Date() }}
                  events={[
                    ...datesNonLibres,
                    ...(dateEntree && dateSortie
                      ? [
                          {
                            start: moment(dateEntree).format('YYYY-MM-DD[T]14:00'),
                            end: moment(dateSortie).format('YYYY-MM-DD[T]11:00'),
                            display: 'background',
                            backgroundColor: '#1d963a',
                          },
                        ]
                      : []),
                  ]}
                  selectOverlap={false}
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
