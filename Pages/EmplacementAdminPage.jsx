import { useEffect, useState } from "react";
import EmplacementAdminCard from "../Composants/CarteEmplacementAdmin";
import { fetchEmplacements } from "../src/Services/ReservationService";
import { Button, Container } from "react-bootstrap";

const EmplacementsAdminPage = () => {

    const [emplacements, setEmplacements] = useState([]);

    const AllEmplacements = async () => {
        try {
            const response = await fetchEmplacements();
            setEmplacements(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect (()=> {
        AllEmplacements();
    }, []  );

    return (
        <>
            <Container className="w-75 d-flex justify-content-center align-items-center flex-column gap-3">
                <h1 style={{
                    color: 'white'
                }}>Liste des Emplacements</h1>
                <Button  href="/AjouterEmplacementAdmin" >Créer un emplacement</Button> 
                <Button href="/AjouterServiceAdmin" >Créer un service</Button> 
                {emplacements.map(emplacement => (
                    
                    <EmplacementAdminCard 
                        numero={emplacement.numero} 
                        tarif={emplacement.tarif} 
                        type={emplacement.type} 
                        key={emplacement.idEmplacement} 
                        idEmplacement={emplacement.idEmplacement} 
                    />
                ))}
            </Container>
        </>
    );
}

export default EmplacementsAdminPage;
