import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { fetchEmplacements, fetchReservations } from '../src/Services/ReservationService';
import { useNavigate } from 'react-router-dom';


const Calendar = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();



const fetchReservationsALL = async() => {
    try {
       const response = await fetchReservations();
       setReservations(response.data);
       console.log(response.data)
       
    } catch (error) {
        
    }
}

  useEffect(() => {
    fetchReservationsALL();
   
  }, []);

  const events = reservations.map(reservation => ({
    id: reservation.idReservation,
    title: `Emplacement ${reservation.numero} pour ${reservation.nom}  ${reservation.prenom}`,
    start: new Date(reservation.dateEntree).toISOString().split('T')[0],
    end: new Date(reservation.dateSortie).toISOString().split('T')[0],
    backgroundColor: 'pink',
    borderColor: 'black',

    

  })
);

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
