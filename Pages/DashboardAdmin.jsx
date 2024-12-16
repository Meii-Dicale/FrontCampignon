import { useEffect, useState } from "react";
import NavBarAdmin from "../Composants/NavbarAdmin";
import Contact from "../src/Services/ContactService";
import { Alert, Button, Container } from "react-bootstrap";
import ContactCard from "../Composants/CarteContact";
import NouvellesReservations from "../src/Services/ReservationService";
import ReservationCard from "../Composants/CarteReservation";


function DashboardAdmin() {

    const [NouveauxMessages, setNouveauxMessages] = useState([]);
    const [NouvellesReservation, setNouvellesReservation] = useState([]);

    const fetchNouveauxMessages = async () => {
        // Récupération des nouveaux messages
        const response = await Contact();
        setNouveauxMessages(response.data);
        console.log(response.data);
      };

    const fetchNouvellesReservation = async () => {
        // Récupération des nouvelles réservations
        const response = await NouvellesReservations();
        setNouvellesReservation(response.data);
        console.log(response.data);
        
      };

    
      useEffect(() => {
        fetchNouveauxMessages();
        fetchNouvellesReservation();
      }, []);

return (
<>

  <NavBarAdmin />
  <Container className="d-flex w-75 justify-content-around ">
<div className="dashboard d-flex flex-row gap-5 justify-content-between">
    <div className="messages d-flex flex-column w-25">
     <div className="d-flex flex-column ">
        <Alert key={'light'} variant={'light'}>
          Nouveaux messages 
          <Button href="/ArchivesMessagesAdmin">Voir archives</Button>
        </Alert>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
        {NouveauxMessages.length === 0 && <Alert key={'light'} variant={'light'}>
          Aucun nouveau message
          
        </Alert>
        }
        
{NouveauxMessages.map(message=> ( <ContactCard key={message.idContact}mail={message.mail} nom={message.nom} message={message.message} idContact={message.idContact}></ContactCard>))
}
</div>
    </div>

    <div className="messages d-flex flex-column w-25 gap-3">
    <div className="d-flex ">
        
        <Alert key={'light'} variant={'light'}>
          Nouvelles Reserations
          <Button href="/ArchivesReservationAdmin">Voir archives</Button>
        </Alert>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
           
            {NouvellesReservation.length === 0 && <Alert key={'light'} variant={'light'}> Aucune Réservations </Alert>}
            {NouvellesReservation.map(reservation => (
    reservation.validation === 0 ? (
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
            </div>
</div>
</Container>

</>
)
}
export default DashboardAdmin;