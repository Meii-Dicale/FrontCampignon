import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // affichage calendrier
import interactionPlugin from '@fullcalendar/interaction'; // pour pouvoir sélectionner dans le calendrier
import frLocale from '@fullcalendar/core/locales/fr'; // pour afficher les éléments en français
import moment from 'moment'; // travailler avec les dates

import MyNavbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import Footer from '../Composants/footer';

import AuthContext from '../src/Context/AuthContext';
import { listeServicesEmplacements, infosUtilisateur } from '../src/Services/apiServices';
import { ajouterResa, resaParEmplacement, addServiceResa } from '../src/Services/ReservationService';
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
      // on récupère toutes les infos dont on a besoin au chargement
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
          // formatage des dates et création des 'events' de calendar occupés
          start: moment(resa.dateEntree).format('YYYY-MM-DD'),
          end: moment(resa.dateSortie).format('YYYY-MM-DD'),
          display: 'background',
          backgroundColor: '#fd3030',
          selectable: false, // les dates OQP sont non cliquables
        }));
        console.log(formatDate);
        setDatesNonLibres(formatDate);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [data.emplacement, user.id]);

  const verifPromoApplicable = (promotion, services, emplacement, nbJours) => {
    if (promotion.idService) {
      const serviceSelectionne = services.some(s => s.idService === promotion.idService);
      return serviceSelectionne && nbJours >= promotion.contrainte;
    }
    return promotion.type === emplacement.type && nbJours >= promotion.contrainte;
  };

  useEffect(() => {
    if (dateEntree && dateSortie) {
      const nbJours = Math.max(1, moment(dateSortie).diff(moment(dateEntree), 'days'));
      const promos = promotions.filter((promo) => verifPromoApplicable(promo, selectionServices, data, nbJours));
      setPromosApplicables(promos);
    }
  }, [dateEntree, dateSortie, selectionServices, promotions]);

  // Cette fonction gère la validation des dates pour une réservation.
  const validerDates = (start, end) => {
    if (!start || !end) return false; // renvoi faux si on a pas les 2 parties

    const startMo = moment(start);
    const endMo = moment(end);

    if (endMo.isBefore(startMo)) {
      return false;
    }

    return !datesNonLibres.some((resa) => {
      const debutResa = moment(resa.start);
      const finResa = moment(resa.end);
      if (startMo.isSame(debutResa, 'day')) {
        return true;
      }

      const chevauche =
        startMo.isBetween(debutResa, finResa, 'minute', '[]') ||
        endMo.isBetween(debutResa, finResa, 'minute', '[]') ||
        debutResa.isBetween(startMo, endMo, 'minute', '[]');

      return chevauche;
    });
  };
  // Elle prend en paramètre un seul paramètre, `choixInfo`, qui est un objet contenant les dates de début et de fin de la sélection.
  // La fonction met à jour les variables d'état `dateEntree` et `dateSortie` avec les dates de début et de fin sélectionnées respectivement.
  const handleChoixDate = (choixInfo) => {
    const newDateEntree = moment(choixInfo.startStr).set({
      hour: 14,
      minute: 0,
    });
    const newDateSortie = moment(choixInfo.endStr).set({
      hour: 11,
      minute: 0,
    });

    // Vérifiez si les dates sélectionnées chevauchent une réservation existante
    if (validerDates(newDateEntree, newDateSortie)) {
      setDateEntree(newDateEntree);
      setDateSortie(newDateSortie);
    } else {
      alert('Les dates sélectionnées chevauchent une réservation existante, veuillez choisir une période libre');
    }
  };

  const handleDateEntreeChange = (e) => {
    const newDateEntree = moment(e.target.value);
    newDateEntree.set({ hour: 14, minute: 0 });

    if (dateSortie && validerDates(newDateEntree, dateSortie)) {
      setDateEntree(newDateEntree);
    } else if (!dateSortie) {
      setDateEntree(newDateEntree);
    } else {
      alert("La date d'arrivée sélectionnée n'est pas valide.");
    }
  };

  const handleDateSortieChange = (e) => {
    const newDateSortie = moment(e.target.value);
    newDateSortie.set({ hour: 11, minute: 0 });

    if (dateEntree && validerDates(dateEntree, newDateSortie)) {
      setDateSortie(newDateSortie);
    } else if (!dateEntree) {
      setDateSortie(newDateSortie);
    } else {
      alert("La date de départ sélectionnée n'est pas valide.");
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

    // ajout des services cochés
    montant += selectionServices.reduce((total, service) => total + service.tarif, 0);

    if (promosApplicables.length > 0) {
      promosApplicables.forEach(promo => {
        if (promo.idService) {
            const serviceAssocie = selectionServices.find(s => s.idService === promo.idService);
            if (serviceAssocie) {
                const reduction = (serviceAssocie.tarif * parseFloat(promo.typePromo)) /100;
                montant -= reduction;
            }
        } else {
            const reduction = (montant * parseFloat(promo.typePromo)) /100;
            montant -= reduction;
        }
      });
    }
    return Number(montant.toFixed(2));
  };

  // Ajout d'une fonction pour calculer le montant de la réduction
 const calculReduction = (promo, montantService = 0) => {
    const reduction = promo.idService 
      ? (montantService * parseFloat(promo.typePromo)) / 100
      : (calculTotal() * parseFloat(promo.typePromo)) / 100;
    return Number(reduction.toFixed(2));
  };

  const handleSubmit = async () => {
    if (!dateEntree || !dateSortie) {
      alert('Veuillez sélectionner une période de réservation.');
      return;
    }
    try {
      let resaResponse;
      // données de base du paquet
      const baseResaData = {
        dateEntree: moment(dateEntree).format('YYYY-MM-DD[T]HH:mm'),
        dateSortie: moment(dateSortie).format('YYYY-MM-DD[T]HH:mm'),
        idUtilisateur: user.id, // Utilisation de l'ID de l'utilisateur du contexte
        idEmplacement: data.idEmplacement,
      };

      const facturer = calculTotal();

      if (promosApplicables.length === 0) {
        resaResponse = await ajouterResa({
          ...baseResaData,
          idPromotion: null,
        });
      } else {
        const reservationPromises = promosApplicables.map((promo) =>
          ajouterResa({
            ...baseResaData,
            idPromotion: promo.idPromotion,
          })
        );
        // on crée toutes les itérations de la résa selon les promos
        const resas = await Promise.all(reservationPromises);
        [resaResponse] = resas;
      }
      if (!resaResponse) {
        throw new Error('echec de la réservation');
      }
      if (selectionServices.length > 0) {
        await Promise.all(
          selectionServices.map((service) =>
            addServiceResa({
              idReservation: resaResponse.idReservation,
              idService: service.idService,
            })
          )
        );
      }
      console.log('validation paiement',resaResponse,'win', baseResaData,'a regler', facturer,'options' ,selectionServices,promosApplicables);
      navigate('/paiement', {
        state: {
          reservation: baseResaData,
          idReservation: resaResponse.data.idReservation,
          montant: facturer,
          services: selectionServices,
          promotions: promosApplicables,
        },
      });
    } catch (e) {
      console.error('Erreur lors de la réservation : ', e);
      alert("une erreur est survenue : veuillez contacter notre service client afin d'effectuer votre réservation");
    }
  };
console.log('dates non libres :',datesNonLibres);
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
                  Services demandés :<br />
                  {selectionServices.map((service) => `${service.libelle} (${service.tarif}€)`).join(', ')}
                </Card.Text>
                {promosApplicables.length > 0 && (
                  <Card.Text>
                    Promotions appliquées :<br />
                    {promosApplicables.map((promo, index) => {
                      const serviceAssocie = promo.idService 
                        ? selectionServices.find(s => s.idService === promo.idService)
                        : null;
                      const reduction = calculReduction(promo, serviceAssocie?.tarif);
                      
                      return (
                        <div key={index} className="text-success">
                          {promo.promolibelle} : -{reduction}€ 
                          {serviceAssocie ? ` (sur ${serviceAssocie.libelle})` : ' (sur le total)'}
                        </div>
                      );
                    })}
                  </Card.Text>
                )}
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
                      onChange={handleDateEntreeChange}
                      className='form-control'
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId='dateSortie'>
                    <Form.Label>Départ</Form.Label>
                    <Form.Control
                      type='datetime-local'
                      value={dateSortie ? moment(dateSortie).format('YYYY-MM-DD[T]11:00') : ''}
                      onChange={handleDateSortieChange}
                      className='form-control'
                      required
                    />
                  </Form.Group>
                </Form>
                <FullCalendar
                  locale={frLocale}
                  initialView='dayGridMonth'
                  headerToolbar={{ left: 'title', right: 'dayGridMonth,dayGridWeek,prev,today,next' }}
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
