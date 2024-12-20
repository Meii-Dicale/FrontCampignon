import { Button, Container, Table } from "react-bootstrap";
import { listeServices } from "../src/Services/apiServices";
import { useEffect, useState } from "react";
import { fetchEmplacements } from "../src/Services/ReservationService";
import { deletePromo, fetchPromo } from "../src/Services/PromosServices";
import PromosServices from "../src/Services/PromosServices";

const PromotionAdmin = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [services, setServices] = useState([]);
    const [emplacements, setEmplacements] = useState([]);
    const [formData, setFormData] = useState({
        idService: '',
        typePromo: '',
        contrainte: '',
        type: '',
        libelle: '',
    });
    const [allPromos, setAllPromos] = useState([]);

    // Charger les services
    const fetchAllServices = async () => {
        try {
            const response = await listeServices();
            setServices(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des services", error);
        }
    };

    // Charger les emplacements
    const fetchAllEmplacement = async () => {
        try {
            const response = await fetchEmplacements();
            setEmplacements(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des emplacements", error);
        }
    };

    // Charger les promotions
    const ToutePromos = async () => {
        try {
            const response = await fetchPromo();
            setAllPromos(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des promotions", error);
        }
    };

    // Ajouter une nouvelle promotion
    const NouvellePromotion = async (dataToSend) => {
        try {
            const response = await PromosServices.AjouterPromotion(dataToSend);

            if (response.status === 409) {
                setErrorMessage("Cette promotion existe déjà.");
                return;
            }

            if (response.status !== 200) {
                setErrorMessage("Une erreur est survenue lors de l'ajout de la promotion.");
                return;
            }

            setErrorMessage(''); // Réinitialiser le message d'erreur si tout va bien
            await ToutePromos(); // Rafraîchir la liste des promotions après l'ajout
        } catch (error) {
            console.error("Erreur lors de l'ajout de la promotion", error);
            setErrorMessage("La promotion existe déjà.");
        }
    };

    // Supprimer une promotion
    const handleDelete = async (idPromo) => {
        try {
            await deletePromo(idPromo);
            await ToutePromos(); // Rafraîchir la liste des promotions après la suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de la promotion", error);
        }
    };

    // Gestion des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            idService: formData.idService === '' ? null : formData.idService,
            typePromo: formData.typePromo === '' ? null : formData.typePromo,
            contrainte: formData.contrainte === '' ? null : formData.contrainte,
            type: formData.type === '' ? null : formData.type,
            libelle: formData.libelle === ''? null : formData.libelle,
        };
        NouvellePromotion(dataToSend);
    };

    // Charger les données au montage du composant
    useEffect(() => {
        fetchAllServices();
        fetchAllEmplacement();
        ToutePromos();
    }, []);

    // Obtenir les types uniques d'emplacements
    const types = [...new Set(emplacements.map((emplacement) => emplacement.type))];

    return (
        <>
            <Container className="col-8">
                {errorMessage && <div className="error-message alert alert-danger">{errorMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <select name="idService" onChange={handleChange}>
                        <option value="">-- Aucun service --</option>
                        {services.map((service) => (
                            <option key={service.idService} value={service.idService}>
                                {service.libelle}
                            </option>
                        ))}
                    </select>

                    <select name="type" onChange={handleChange}>
                        <option value="">-- Aucun emplacement --</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Taux de réduction"
                        name="typePromo"
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        name="libelle"
                        onChange={handleChange}
                        required
                        />

                    <input
                        type="number"
                        placeholder="Nombre de nuits minimum pour activer la promotion"
                        name="contrainte"
                        onChange={handleChange}
                    />

                    <button type="submit">Ajouter promotion</button>
                </form>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Taux de réduction</th>
                            <th>Nombre de nuits minimum</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPromos.map((promo) => (
                            <tr key={promo.idPromotion}>
                                <td>{promo.libelle}</td>
                                <td>{promo.promolibelle}</td>
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
    );
};

export default PromotionAdmin;
