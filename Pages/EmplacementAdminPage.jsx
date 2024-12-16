import { useEffect, useState } from "react";
import EmplacementAdminCard from "../Composants/CarteEmplacementAdmin";
import { fetchEmplacements } from "../src/Services/ReservationService";
import { Container } from "react-bootstrap";

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
            <Container className="w-75 d-flex flex-column gap-3">
                <h1 style={{
                    color: 'white'
                }}>Liste des Emplacements</h1>
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
