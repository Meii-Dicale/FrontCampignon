import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Archivage } from '../src/Services/ContactService';

function ReservationCard({ nom, mail, prenom, numero, tarif, dateEntree, dateSortie, idReservation, type }) {


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Reservation de l'emplacement {numero}</Card.Title>
        <Card.Text>
        Numéro Réservation : {idReservation}
        <br />
        Réservé à {prenom} {nom}
        <br />
        Du {dateEntree} au {dateSortie}
        <br />  
        Tarif : {tarif} €
        <br />
        Logement : {type}
        </Card.Text>
        <div className='d-flex gap-5'>
          <Button variant="primary" href={`mailto:${mail}`}>
            Contacter
          </Button>

        </div>
      </Card.Body>
    </Card>
  );
}

export default ReservationCard;
