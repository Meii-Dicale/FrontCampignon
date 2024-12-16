import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import EmplacementServices from '../src/Services/EmplacementServices';
import Card from 'react-bootstrap/Card';
import { Button, Form } from 'react-bootstrap';

//https://rapidapi.com/guides/upload-files-react-axios

function EmplacementDetail() {
  const { id } = useParams();
  const [emplacement, setEmplacement] = useState();
  const [services, setServices] = useState([]);
  const [photographies, setPhotographies] = useState([]);
  const [modification, setModification] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [formData, setFormData] = useState({});
  const [nouveauxServices, setNouveauxServices] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // Nouvelle state pour l'image
  const idEmplacement = id;
  const navigate = useNavigate();

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

  const fetchServices = async () => {
    try {
      const response = await EmplacementServices.serviceEmplacement(id);
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const DeleteEmplacement = async () => {
    try {
      await EmplacementServices.supprimerEmplacement(id)
      navigate('/emplacementsAdmin');
    } catch (error) {
      console.error(error);
    }}

  const handleClick = () => {
    setModification(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "select-multiple") {
      const selectedServices = Array.from(e.target.selectedOptions, (option) => option.value);
      setNouveauxServices(selectedServices);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('emplacementId', idEmplacement);

    try {
      await EmplacementServices.uploadPhoto(formData); // Ajoutez cette méthode dans vos services
      alert('Image téléchargée avec succès.');
      fetchPhotos(); // Recharger les photos
    } catch (error) {
      console.error(error);
      alert('Échec du téléchargement de l\'image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EmplacementServices.modifierEmplacement(id, formData);
      EmplacementServices.SupprimerAssociation(idEmplacement),
        nouveauxServices.map((idService) => {
          EmplacementServices.associerServiceEmplacement(idService, idEmplacement);
        });
      setModification(false);
      alert('Emplacement modifié');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
    fetchServices();
    Emplacements();
    fetchAllServices();
  }, []);

  if (!emplacement) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{ marginLeft: '250px', width: '75%' }}>
      <h1>Détails de l'emplacement {emplacement.numero}</h1>
      {modification === false ? (
        <Card className="d-flex flex-row">
          {photographies.length > 0 && (
            <div>
              {photographies.map((photographie, index) => (
                <Card.Img key={index} variant="top" src={`../src/assets/${photographie.chemin}`} />
              ))}
            </div>
          )}
          <Card.Body>
            <Card.Title>Emplacement n° {emplacement.numero}</Card.Title>
            <Card.Text>
              Tarif : {emplacement.tarif} €<br />
              Type : {emplacement.type}<br />
              Équipements disponibles :
              {services.length > 0 ? (
                services.map((service, index) =>
                  service && service.libelle ? <li key={index}>{service.libelle}</li> : <span>Aucun équipement disponible</span>
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
              {allServices.length > 0 &&
                allServices.map((service, index) => (
                  <option key={index} value={service.idService}>
                    {service.libelle}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Télécharger une image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button onClick={handleFileUpload}>Télécharger l'image</Button>
          <Button type="submit">Enregistrer les modifications</Button>
        </Form>
      )}
    </div>
  );
}

export default EmplacementDetail;
