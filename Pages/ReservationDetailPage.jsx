import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReservationCard from "../Composants/CarteReservation";
import { ReservationById } from "../src/Services/ReservationService";
import { Container } from "react-bootstrap";

function ReservationDetails () {
  const { idReservation } = useParams(); // Extraction de l'ID depuis les paramètres d'URL
  const [reservations, setReservations] = useState([]); // Utilisation correcte de useState
  console.log(idReservation)

  const fetchReservationByID = async () => {
    
    try {
      const response = await ReservationById(idReservation); // Appel de l'API avec async/await
      console.log(response.data[0]); // Affichage du résultat dans la console
      setReservations(response.data); // Mise à jour de l'état avec les données reçues
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
    }
  };

  useEffect(() => {
    fetchReservationByID();
  }, [idReservation]); 

  return (
    <>
    <Container  className="col-6 p-4 border rounded shadow bg-light">
      {reservations  &&  reservations.map((reservation =>  
        <ReservationCard
          dateEntree={reservation.dateEntree}
          dateSortie={reservation.dateSortie}
          idReservation={reservation.idReservation}
          mail={reservation.mail}
          nom={reservation.nom}
          prenom={reservation.prenom}
          numero={reservation.numero}
          tarif={(reservation.tarif || 0) + (reservation.tarifEmplacement || 0)} // Gestion des valeurs nulles
          type={reservation.type}
          key={idReservation}

        />)
      )}
      </Container>
    </>
  );
};

export default ReservationDetails;
