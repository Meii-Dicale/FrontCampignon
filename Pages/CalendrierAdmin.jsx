import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Container, Form } from 'react-bootstrap';
import { fetchEmplacements, fetchReservations } from '../src/Services/ReservationService';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const [reservations, setReservations] = useState([]);
  const [allEmplacements, setAllEmplacements] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  // Récupérer les réservations
  const fetchReservationsALL = async () => {
    try {
      const response = await fetchReservations();
      setReservations(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error);
    }
  };

  // Récupérer les emplacements
  const fetchAllEmplacements = async () => {
    try {
      const response = await fetchEmplacements();
      setAllEmplacements(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des emplacements :', error);
    }
  };

  useEffect(() => {
    fetchReservationsALL();
    fetchAllEmplacements();
  }, []);

  // Obtenir les types uniques d'emplacements
  const types = [...new Set(allEmplacements.map((emplacement) => emplacement.type))];

  // Filtrer les emplacements en fonction du type sélectionné
  const filteredEmplacements = selectedType
    ? allEmplacements.filter((emplacement) => emplacement.type === selectedType)
    : allEmplacements;

  // Mapper les emplacements en ressources
  const resources = filteredEmplacements.map((emplacement) => ({
    id: emplacement.numero, // Identifiant unique pour la ressource
    title: `${emplacement.type} ${emplacement.numero}`, // Nom ou description de la ressource
  }));

  // Mapper les réservations en événements et filtrer par emplacements correspondants
  const filteredReservationIds = filteredEmplacements.map((emplacement) => emplacement.numero);
  const events = reservations
    .filter((reservation) => filteredReservationIds.includes(reservation.numero))
    .map((reservation) => ({
      id: reservation.idReservation,
      title: `${reservation.nom} ${reservation.prenom} - Emplacement ${reservation.numero}`,
      start: new Date(reservation.dateEntree).toISOString(),
      end: new Date(reservation.dateSortie).toISOString(),
      resourceId: reservation.numero, // Associer l'événement à une ressource
      backgroundColor: '#ffcccc', // Couleur personnalisée
      borderColor: '#ff0000', // Bordure personnalisée
    }));

  return (
    <Container style={{ marginLeft: '250px', backgroundColor: 'white' }}>
      <Form.Group controlId="typeSelect">
        <Form.Label>Type d'emplacement</Form.Label>
        <Form.Control
          as="select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Tous</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        plugins={[resourceTimelinePlugin]}
        initialView="resourceTimelineMonth" // Vue par mois
        events={events} // Renvoi vers le .map des reservations filtrées
        resources={resources} // Renvoi vers le .map des emplacements filtrés
        locale="fr" // Langue française
        editable={true} // Permet d’éditer les événements (optionnel)
        droppable={true} // Permet de glisser-déposer les événements (optionnel)
        eventClick={(info) => {
          // Redirection ou action lors du clic sur un événement
          console.log('Événement cliqué :', info.event);
          navigate(`/reservation/${info.event.id}`);
        }}
      />
    </Container>
  );
};

export default Calendar;
