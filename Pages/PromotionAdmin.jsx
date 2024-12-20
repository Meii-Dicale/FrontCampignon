import { Button, Container, Table, Form, Alert } from "react-bootstrap";
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
        <Container className="mt-5">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-sm bg-light w-75 ms-5 me-auto">
                <Form.Group controlId="idService">
                    <Form.Label>Choisir un service</Form.Label>
                    <Form.Control as="select" name="idService" onChange={handleChange}>
                        <option value="">-- Aucun service --</option>
                        {services.map((service) => (
                            <option key={service.idService} value={service.idService}>
                                {service.libelle}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="type">
                    <Form.Label>Choisir un emplacement</Form.Label>
                    <Form.Control as="select" name="type" onChange={handleChange}>
                        <option value="">-- Aucun emplacement --</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="typePromo">
                    <Form.Label>Taux de réduction (%)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Taux de réduction"
                        name="typePromo"
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />
                </Form.Group>

                <Form.Group controlId="libelle">
                    <Form.Label>Description de la promotion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        name="libelle"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="contrainte">
                    <Form.Label>Nombre de nuits minimum</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Nombre de nuits minimum pour activer la promotion"
                        name="contrainte"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">Ajouter promotion</Button>
            </Form>

            <Table className="mb-4 p-4 border rounded shadow-sm bg-light w-75 ms-5 me-auto">
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
    );
};

export default PromotionAdmin;