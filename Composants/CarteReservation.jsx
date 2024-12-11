import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { ChangerDatesReservations } from '../src/Services/ReservationService';

function ReservationCard({ nom, mail, prenom, numero, tarif, dateEntree, dateSortie, idReservation, type }) {
  const [Modify, setModify] = useState(false);
  const [newDateEntree, setNewDateEntree] = useState(dateEntree);
  const [newDateSortie, setNewDateSortie] = useState(dateSortie);

  const handleValidate = async ()  => {
    await  ChangerDatesReservations(newDateEntree, newDateSortie, idReservation)
    window.location.reload();
    setModify(false);
    
    console.log('Dates mises à jour : ', { newDateEntree, newDateSortie });

  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Réservation de l'emplacement {numero}</Card.Title>
        <Card.Text>
          Numéro Réservation : {idReservation}
          <br />
          Réservé à {prenom} {nom}
          <br />
          {Modify ? (
            <>
              <input
                type="date"
                value={newDateEntree}
                onChange={(e) => setNewDateEntree(e.target.value)}
              />
              <input
                type="date"
                value={newDateSortie}
                onChange={(e) => setNewDateSortie(e.target.value)}
              />
            </>
          ) : (
            <span>
              Du {dateEntree} au {dateSortie}
            </span>
          )}
          <br />
          Tarif : {tarif} €
          <br />
          Logement : {type}
        </Card.Text>
        <div className="d-flex gap-3">
          <Button variant="primary" href={`mailto:${mail}`}>
            Contacter
          </Button>
          {!Modify ? (
            <Button variant="danger" onClick={() => setModify(true)}>
              Modifier
            </Button>
          ) : (
            <Button variant="success" onClick={handleValidate}>
              Valider
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ReservationCard;
