import React, { useContext, useEffect, useState } from 'react';
import NavbarMonCompte from '../Composants/NavbarMonCompte';
import { resaParUtilisateur } from '../src/Services/ReservationService';
import AuthContext from '../src/Context/AuthContext';
import { Card } from 'react-bootstrap';
import moment from 'moment';


function MesReservations() {
  const user = useContext(AuthContext);
const [mesReservations, setMesReservations] = useState([])

  const reservations = async () => {
    const resp = await resaParUtilisateur(user.user.id); 
    setMesReservations(resp.data);
  };
useEffect(() => {
  reservations();
 }, []
);

  return (
    <>
      <NavbarMonCompte />
      <div className='container pt-5 mt-5'>
        <h1>Mes Reservations</h1>
      {mesReservations && mesReservations.map((resa) => 
    (<Card className='my-3'>
      <Card.Header>{moment(resa.dateEntree).format('DD-MM-YYYY')} - {moment(resa.dateSortie).format('DD-MM-YYYY')}</Card.Header>
      <Card.Body>
        <Card.Title>Réservation : {resa.idReservation} {resa.type}</Card.Title>
      </Card.Body>
    </Card>)
      )}
      </div>
    </>
  );
}

export default MesReservations;
