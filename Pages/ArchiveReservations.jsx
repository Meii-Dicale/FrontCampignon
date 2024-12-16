import { useEffect, useState } from "react";
import ReservationCard from "../Composants/CarteReservation";
import NouvellesReservations from "../src/Services/ReservationService";
import { Alert } from "react-bootstrap";

const ArchiveReservation = () => {
    const [ReservationValides, setReservationValides] = useState([]);

    const fetchReservations = async () => {
        // Récupération des nouvelles réservations
        const response = await NouvellesReservations();
        setReservationValides(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <>
        <h1>Archive des réservations</h1>
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
           
        {ReservationValides.length === 0 && <Alert key={'light'} variant={'light'}> Aucune Réservations </Alert>}
        {ReservationValides.map(reservation => (
reservation.validation === 1 ? (
    <ReservationCard 
        key={reservation.idReservation} 
        nom={reservation.nom}
        dateEntree={reservation.dateEntree} 
        dateSortie={reservation.dateSortie} 
        idReservation={reservation.idReservation} 
        mail={reservation.mail} 
        numero={reservation.numero} 
        prenom={reservation.prenom} 
        tarif={reservation.tarif} 
        type={reservation.type}
    />
) : null
))}


        
        </div>
</>
     );
    
}
export default ArchiveReservation;