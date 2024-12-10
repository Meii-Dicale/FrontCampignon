import { useEffect, useState } from "react";
import NavBarAdmin from "../Composants/NavbarAdmin";
import Contact from "../src/Services/ContactService";
import { Alert, Container } from "react-bootstrap";
import ContactCard from "../Composants/CarteContact";


function DashboardAdmin() {

    const [NouveauxMessages, setNouveauxMessages] = useState([]);

    const fetchNouveauxMessages = async () => {
        // Récupération des nouveaux messages
        const response = await Contact();
        setNouveauxMessages(response.data);
        console.log(response.data);
      };
    
      useEffect(() => {
        fetchNouveauxMessages();
      }, []);

return (
<>

  <NavBarAdmin />
  <Container className="d-flex w-75 justify-content-around ">
<div className="dashboard d-flex flex-row gap-5 justify-content-around">
    <div className="messages d-flex flex-column w-25">
     <div className="d-flex "><Alert key={'light'} variant={'light'}>
          Nouveaux messages 
        </Alert>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center ">
        {NouveauxMessages.length === 0 && <Alert key={'light'} variant={'light'}>
          Aucun nouveau message
        </Alert>}
        
{NouveauxMessages.map(message=> ( <ContactCard key={message.idContact}mail={message.mail} nom={message.nom} message={message.message} idContact={message.idContact}></ContactCard>))
}
</div>
    </div>
    
    <div className="messages d-flex flex-column w-25">
    <div className="d-flex "><Alert key={'light'} variant={'light'}>
          Nouveelles Reserations
        </Alert>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center ">
            </div>
            </div>
</div>
</Container>

</>
)
}
export default DashboardAdmin;