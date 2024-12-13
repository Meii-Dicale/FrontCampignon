import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmplacementServices from '../src/Services/EmplacementServices';
import Card from 'react-bootstrap/Card';
import { Button, Form } from 'react-bootstrap';

function EmplacementDetail() {
  const { id } = useParams();
  const [emplacement, setEmplacement] = useState();
  const [services, setServices] = useState([]);
  const [photographies, setPhotographies] = useState([]);
  const [modification, setModification] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [formData, setFormData] = useState({});
  const [nouveauxServices, setNouveauxServices] = useState([]);
  const idEmplacement = id

  // Récupérer tous les emplacements
  const Emplacements = async () => {
    try {
      const response = await EmplacementServices.infoEmplacement(id);
      setEmplacement(response.data);
      setFormData({
        tarif: response.data.tarif,
        type: response.data.type,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Récupérer les services associés
  const fetchServices = async () => {
    try {
      const response = await EmplacementServices.serviceEmplacement(id);
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Récupérer les photos pour un emplacement
  const fetchPhotos = async () => {
    try {
      const response = await EmplacementServices.photos(id);
      setPhotographies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllServices = async () => {
    try {
      const response = await EmplacementServices.AllServices();
      setAllServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setModification(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "select-multiple") {
      // transformer les informatiosn ajoutés en tableau 
      const selectedServices = Array.from(e.target.selectedOptions, option => option.value);
      setNouveauxServices(selectedServices);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mettre à jour les données de l'emplacement
      await EmplacementServices.modifierEmplacement(id, formData);
      EmplacementServices.SupprimerAssociation(idEmplacement),
  

        (nouveauxServices.map((idService) => {
          EmplacementServices.associerServiceEmplacement(idService , idEmplacement)
          console.log(idService, idEmplacement) 
         
        }
        
    ));
     

      setModification(false);
      Emplacements();
     }catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
    fetchServices();
    Emplacements();
    fetchAllServices();
  }, []);

  // Afficher un message de chargement ou l'emplacement une fois les données récupérées
  if (!emplacement) {
    return <div>Chargement...</div>;
  }

  return (
    <div
      style={{
        marginLeft: '250px',
        width: '75%',
      }}
    >
      <h1>Détails de l'emplacement {emplacement.numero}</h1>
      {modification === false ? (
        <Card className="d-flex flex-row">
          {photographies.length > 0 && (
            <div>
              {photographies.map((photographie, index) => (
                <Card.Img
                  key={index}
                  variant="top"
                  src={`../src/assets/${photographie.chemin}`}
                />
              ))}
            </div>
          )}
          <Card.Body>
            <Card.Title>Emplacement n° {emplacement.numero}</Card.Title>
            <Card.Text>
              Tarif : {emplacement.tarif} €
              <br />
              Type : {emplacement.type}
              <br />
              Équipements disponibles :
              {services.length > 0 ? (
                services.map((service, index) => (
                  service && service.libelle ? (
                    <li key={index}>{service.libelle}</li>
                  ) : (
                    <span><br />Aucun équipement disponible</span>
                  )
                ))
              ) : (
                <li>Aucun équipement disponible</li>
              )}
            </Card.Text>
            <Button onClick={handleClick}>Modifier</Button>
          </Card.Body>
        </Card>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Tarif</Form.Label>
            <Form.Control
              type="number"
              name="tarif"
              value={formData.tarif}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Services disponibles</Form.Label>
            <Form.Control
              as="select"
              name="services"
              multiple
              onChange={handleChange}
            >
              {allServices.length > 0 &&
                allServices.map((service, index) => (
                  <option key={index} value={service.idService}>
                    {service.libelle}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Button type="submit">Enregistrer les modifications</Button>
        </Form>
      )}
    </div>
  );
}

export default EmplacementDetail;
