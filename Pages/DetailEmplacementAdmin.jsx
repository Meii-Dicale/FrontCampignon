import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import EmplacementServices from '../src/Services/EmplacementServices';
import { Card, Button, Form, Carousel } from 'react-bootstrap';
import ImageUpload from '../src/Services/FileUpload';

function EmplacementDetail() {
  const { id } = useParams();
  const [emplacement, setEmplacement] = useState();
  const [services, setServices] = useState([]);
  const [photographies, setPhotographies] = useState([]);
  const [modification, setModification] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [formData, setFormData] = useState({});
  const [nouveauxServices, setNouveauxServices] = useState([]);
  const idEmplacement = id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emplacementResponse = await EmplacementServices.infoEmplacement(id);
        setEmplacement(emplacementResponse.data);
        setFormData({
          tarif: emplacementResponse.data.tarif,
          type: emplacementResponse.data.type,
        });

        const servicesResponse = await EmplacementServices.serviceEmplacement(id);
        setServices(servicesResponse.data);

        const photosResponse = await EmplacementServices.photos(id);
        setPhotographies(photosResponse.data);

        const allServicesResponse = await EmplacementServices.AllServices();
        setAllServices(allServicesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = () => setModification(true);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'select-multiple') {
      const selectedServices = Array.from(e.target.selectedOptions, (option) => option.value);
      setNouveauxServices(selectedServices);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EmplacementServices.modifierEmplacement(id, formData);
      await EmplacementServices.SupprimerAssociation(idEmplacement);
      nouveauxServices.forEach((idService) => {
        EmplacementServices.associerServiceEmplacement(idService, idEmplacement);
      });
      setModification(false);
      alert('Emplacement modifié');
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteEmplacement = async () => {
    try {
      await EmplacementServices.supprimerEmplacement(id);
      navigate('/emplacementsAdmin');
    } catch (error) {
      console.error(error);
    }
  };

  if (!emplacement) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{ marginLeft: '250px', width: '75%' }}>
      <h1>Détails de l'emplacement {emplacement.numero}</h1>
      {modification === false ? (
        <Card className="d-flex flex-row align-items-center justify-content-center align-self-center">
          {photographies.length > 0 && (
            <Carousel style={{ width: '60%' }}>
              {photographies.map((photographie) => (
                <Carousel.Item key={photographie.idPhoto}>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:3001/api/photo${photographie.chemin}`}
                    alt={`Photographie ${photographie.idPhoto}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          <Card.Body>
            <Card.Title>Emplacement n° {emplacement.numero}</Card.Title>
            <Card.Text>
              Tarif : {emplacement.tarif} €<br />
              Type : {emplacement.type}<br />
              Équipements disponibles :
              {services.length > 0 ? (
                services.map((service) =>
                  service && service.libelle ? (
                    <li key={service.idService}>{service.libelle}</li>
                  ) : (
                    <span key={service.idService}>Aucun équipement disponible</span>
                  )
                )
              ) : (
                <li>Aucun équipement disponible</li>
              )}
            </Card.Text>
            <Button onClick={handleClick}>Modifier</Button>
            <Button variant="danger" onClick={DeleteEmplacement}>
              Supprimer
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Tarif</Form.Label>
            <Form.Control type="number" name="tarif" value={formData.tarif} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Services disponibles</Form.Label>
            <Form.Control as="select" name="services" multiple onChange={handleChange}>
              {allServices.map((service) => (
                <option key={service.idService} value={service.idService}>
                  {service.libelle}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <ImageUpload idEmplacement={emplacement} key={emplacement.idEmplacement} />
          <Button type="submit">Enregistrer les modifications</Button>
        </Form>
      )}
    </div>
  );
}

export default EmplacementDetail;
