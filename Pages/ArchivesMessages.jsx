import { useEffect, useState } from "react";
import { Supprimer, VoirArchives } from "../src/Services/ContactService";
import ContactCard from "../Composants/CarteContact";
import { Button, Container } from "react-bootstrap";

const ArchiveMessage = () => {
    const [Archives, setArchives] = useState([]);

    const fetchMessageArchives = async () => {
        const response = await VoirArchives()
        setArchives(response.data);
        console.log(response.data);

    }

    const handleClick = (idContact) => {
        Supprimer(idContact)
        fetchMessageArchives()
    }

useEffect(() => { 
    fetchMessageArchives()
}, [] );

    return (
        <>
        <h1>Archive des messages</h1>

        {Archives.map(archive => ( 
        <Container className="d-flex flex-column justify-content-center col-3 gap-3 mb-3">
        <ContactCard idContact={archive.idContact} mail={archive.mail} message={archive.message} nom={archive.nom} key={archive.idContact}></ContactCard> 
        <Button onClick={()=>handleClick(archive.idContact)} className="w-50"> Supprimer </Button>
        </Container>))}

        </>
     );
    
}
export default ArchiveMessage;