import { useEffect, useState } from "react";
import { listeServices } from "../src/Services/apiServices";
import EmplacementServices from "../src/Services/EmplacementServices";

import { Button, Container, Alert } from "react-bootstrap";

const StockAdminPage = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchAllServices = async () => {
    try {
      const response = await listeServices();
      setServices(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des services.");
      console.error(err);
    }
  };

  const handleIncrement = async (service) => {
    try {
      const updatedService = { ...service, stock: service.stock + 1 };
      await EmplacementServices.updateService(updatedService);
      setSuccess(`Stock du service "${service.libelle}" augmenté avec succès.`);
      setError(null);
      fetchAllServices();
    } catch (err) {
      setError("Erreur lors de l'incrémentation du stock.");
      setSuccess(null);
      console.error(err);
    }
  };

  const handleDecrement = async (service) => {
    if (service.stock > 0) {
      try {
        const updatedService = { ...service, stock: service.stock - 1 };
        await EmplacementServices.updateService(updatedService);
        setSuccess(`Stock du service "${service.libelle}" diminué avec succès.`);
        setError(null);
        fetchAllServices();
      } catch (err) {
        setError("Erreur lors de la décrémentation du stock.");
        setSuccess(null);
        console.error(err);
      }
    } else {
      setError("Le stock ne peut pas être négatif.");
      setSuccess(null);
    }
  };
  const handleDelete = async (idService) => {
    try {
   
      await EmplacementServices.supprimerService(idService);
      setSuccess(`Service supprimé avec succès.`);
      setError(null);
      fetchAllServices();
    } catch (err) {
      setError("Erreur lors de la suppression du service.");
      setSuccess(null);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <>
      <Container className="col-6 p-4 border rounded shadow bg-light">
        <h3 className="text-center mb-4">
          Liste des Services{" "}
          <Button href="/AjouterServiceAdmin">Ajouter un Service</Button>
        </h3>

        {/* Affichage des messages de succès ou d’erreur */}
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <table className="table table-bordered table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>Nom du Service</th>
              <th>Prix (€)</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{service.libelle}</td>
                <td>{service.tarif} €</td>
                <td>
                  {service.stock !== null ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleDecrement(service)}
                        disabled={service.stock <= 0}
                      >
                        -
                      </button>
                      <span>{service.stock}</span>
                      <button
                        className="btn btn-sm btn-success ms-2"
                        onClick={() => handleIncrement(service)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span>Pas de stock</span>
                  )}
                </td>
                <td> <Button onClick={() => handleDelete(service.idService)}>Supprimer ce service</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default StockAdminPage;
