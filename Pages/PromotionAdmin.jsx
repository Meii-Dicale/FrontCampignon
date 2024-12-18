import { Button, Container, Table } from "react-bootstrap"
import { listeServices } from "../src/Services/apiServices";
import { useEffect, useState } from "react";
import { fetchEmplacements } from "../src/Services/ReservationService";
import { deletePromo, fetchPromo } from "../src/Services/PromosServices";
import PromosServices from "../src/Services/PromosServices";

const PromotionAdmin = () => {
    const [services, setServices] = useState([]);
    const [emplacements, setEmplacements] = useState([]);
    const [formData, setFormData] = useState({
        idService: '',
        typePromo: '',
        contrainte: '',
        type: '',
      });
      const dataToSend = {
        ...formData,
        idService: formData.idService === '' ? null : formData.idService,
        typePromo: formData.typePromo === ''? null : formData.typePromo,
        contrainte: formData.contrainte === ''? null : formData.contrainte,
        type: formData.type === ''? null : formData.type,
        
      };
      const [allPromos, setAllPromos] = useState([])
    const fetchAllServices = async () => {
        const response = await listeServices();

        setServices(response.data);
        if (response.error) {
            console.error("Erreur lors de la récupération des services", response.error);
            return;
        }
      
    }
    const fetchAllEmplacement = async () => {
        const response = await fetchEmplacements();

        setEmplacements(response.data);

    }
    const NouvellePromotion = (dataToSend) => {
        // Ajouter une nouvelle promotion
        const response = PromosServices.AjouterPromotion(dataToSend)

        if (response.error) {
            console.error("Erreur lors de l'ajout de la promotion", response.error);
            return;
        }
    }
        // Convertir les champs vides en null
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
      };
     
    const handleSubmit =  (e) => {
        e.preventDefault();
         NouvellePromotion(dataToSend);
    }
    const ToutePromos = async () => {
        try {
            const response = await fetchPromo();
            console.log(response.data);
            setAllPromos(response.data);
        } catch (error) {
            console.error(error);
    
    }}


    useEffect( 
        () => {
            fetchAllServices();
            fetchAllEmplacement();
            ToutePromos(); 
        }, []
    )

    const handleDelete = async (idPromo) => {
        try {
            await deletePromo(idPromo);
            setAllPromos(allPromos.filter((promo) => promo.idPromo !== idPromo));
            ToutePromos();  // Rafraîchir la liste des promotions après la suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de la promotion", error);
        }
    };

  // Obtenir les types uniques d'emplacements
  const types = [...new Set(emplacements.map((emplacement) => emplacement.type))];

return (
    <>
    <Container className="col-8">

    <select name="idService" onChange={handleChange}>
    <option value="">-- Aucun service --</option> {/* Option vide pour le null en bdd */}
    {services.map((service) => (
        <option key={service.idService} value={service.idService}>
            {service.libelle}
        </option>
    ))}
</select>

<select name="type" onChange={handleChange}>
    <option value="">-- Aucun emplacement --</option> {/* Option vide pour le null en bdd*/}
    {types.map((type) => (
        <option key={type} value={type}>
            {type}
        </option>
    ))}
</select>


<input type="text" placeholder="Taux de réduction" name="typePromo" onChange={handleChange}/>

{/* Ajouter une contrainte de nombre de nuit pour activer la promotion */}

<input type="number" placeholder="Nombre de nuits minimum pour activer la promotion" name="contrainte" onChange={handleChange} />


    <button onClick={handleSubmit}>Ajouter promotion</button>
    <Table  striped bordered hover>
                    <thead>
                        <tr>
                            
                            <th>Service</th>
                            <th>Type</th>
                            <th>Type Promo</th>
                            <th>Contrainte</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPromos.map((promo) => (
                            <tr key={promo.idPromotion}>
                             
                                <td>{promo.libelle}</td>
                                <td>{promo.type}</td>
                                <td>{promo.typePromo}</td>
                                <td>{promo.contrainte}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(promo.idPromotion)}>
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
    </Container>
    </>
)
}

export default PromotionAdmin