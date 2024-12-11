import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { Container } from 'react-bootstrap';


const Calendar = () => {
  const [reservations, setReservations] = useState([]);
  const [emplacements, setEmplacements] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const res = await axios.get('http://localhost:3001/api/reservations/AllReservations');
      setReservations(res.data);
    };

    const fetchEmplacements = async () => {
      const res = await axios.get('http://localhost:3001/api/emplacement/');
      setEmplacements(res.data);
    };

    fetchReservations();
    fetchEmplacements();
  }, []);

  const events = reservations.map(reservation => ({
    id: reservation.idReservation,
    title: `Emplacement ${reservation.idEmplacement}`,
    start: reservation.dateEntree,
    end: reservation.dateSortie
  }));

  return (
    <Container style={{
        marginLeft: '250px',
  

    }}>

  
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      events={events}
      locale="fr"
      
    />
      </Container>
  );
};

export default Calendar;
