import { Container } from "react-bootstrap"
import { listeServices } from "../src/Services/apiServices";
import { useEffect, useState } from "react";
import { fetchEmplacements } from "../src/Services/ReservationService";

const PromotionAdmin = () => {
    const [services, setServices] = useState([]);
    const [emplacements, setEmplacements] = useState([]);

    const fetchAllServices = async () => {
        const response = await listeServices();
        console.log(response.data);
        setServices(response.data);
        if (response.error) {
            console.error("Erreur lors de la récupération des services", response.error);
            return;
        }
      
    }
    const fetchAllEmplacement = async () => {
        const response = await fetchEmplacements();
        console.log(response.data);
        setEmplacements(response.data);

    }

    useEffect( 
        () => {
            fetchAllServices();
            fetchAllEmplacement();
        }, []
    )


  // Obtenir les types uniques d'emplacements
  const types = [...new Set(emplacements.map((emplacement) => emplacement.type))];

return (
    <>
    <Container>

    <select name="service">
    <option value="">-- Aucun service --</option> {/* Option vide pour le null en bdd */}
    {services.map((service) => (
        <option key={service.idService} value={service.idService}>
            {service.libelle}
        </option>
    ))}
</select>

<select name="emplacement">
    <option value="">-- Aucun emplacement --</option> {/* Option vide pour le null en bdd*/}
    {types.map((type) => (
        <option key={type} value={type}>
            {type}
        </option>
    ))}
</select>


<input type="text" placeholder="Taux de réduction" name="tauxReduction" />

{/* Ajouter une contrainte de nombre de nuit pour activer la promotion */}

<input type="number" placeholder="Nombre de nuits minimum pour activer la promotion" name="contrainte" />


    <button>Ajouter promotion</button>
    </Container>
    </>
)
}

export default PromotionAdmin