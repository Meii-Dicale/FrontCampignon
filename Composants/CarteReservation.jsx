import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { ChangerDatesReservations, DeleteReservation, ValiderResa } from '../src/Services/ReservationService';

function ReservationCard({ nom, mail, prenom, numero, tarif, dateEntree, dateSortie, idReservation, type }) {
  const [Modify, setModify] = useState(false);
const [newDateEntree, setNewDateEntree] = useState(() =>
  dateEntree ? new Date(dateEntree).toISOString().split('T')[0] : ''
);
const [newDateSortie, setNewDateSortie] = useState(() =>
  dateSortie ? new Date(dateSortie).toISOString().split('T')[0] : ''
);


  const handleValidate = async () => {
    if (new Date(newDateEntree) >= new Date(newDateSortie)) {
      alert('La date de sortie doit être postérieure à la date d\'entrée.');
      return;
    }

    try {
      await ChangerDatesReservations(newDateEntree, newDateSortie, idReservation);
      alert('Dates mises à jour avec succès !');
      setModify(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des dates :', error);
      alert('Une erreur est survenue lors de la mise à jour.');
    }
  };

  const Valider = async () => {
    try {
      await ValiderResa(idReservation);
      alert('Réservation validée avec succès!');
    } catch (error) {
      console.error('Erreur lors de la validation de la réservation :', error);
      alert('Une erreur est survenue lors de la validation.');
    }
  }

  const Supprimer = async () => {
    try {
      await DeleteReservation(idReservation);
      alert('Réservation supprimée avec succès!');
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation :', error);
      alert('Une erreur est survenue lors de la suppression.');
    }
  }


  return (
    <Card style={{ width: '22rem' }} className="mb-3">
      <Card.Body>
        <Card.Title>Réservation de l'emplacement {numero}</Card.Title>
        <Card.Text className="mb-3">
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
                className="form-control mb-2"
              />
              <input
                type="date"
                value={newDateSortie}
                onChange={(e) => setNewDateSortie(e.target.value)}
                className="form-control"
              />
            </>
          ) : (
            <span>
              Du 
              <br />
              {new Date(dateEntree).toISOString().split('T')[0]}
              <br /> au 
              <br />
              {new Date(dateSortie).toISOString().split('T')[0]}
            </span>
          )}
          <br />
          <span className="text-muted">Tarif : {tarif} €</span>
          <br />
          <span className="text-muted">Logement : {type}</span>
        </Card.Text>
        <div className="d-flex gap-3">
          <div>
          <Button variant="primary" href={`mailto:${mail}`}>
            Contacter
          </Button>
          {!Modify ? (
            <Button variant="warning" onClick={() => setModify(true)}>
              Modifier
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleValidate}
              disabled={newDateEntree === dateEntree && newDateSortie === dateSortie}
            >
              Valider
            </Button>
          )}
          </div>
          <div>
          <Button variant="success" onClick={Valider}>
            Valider
          </Button>
          <Button variant="danger" onClick={Supprimer}>Supprimer</Button>
        </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ReservationCard;
