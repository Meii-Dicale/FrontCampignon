import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AjoutEmplacement = () => {
  const [formData, setFormData] = useState({
    numero: '',
    type: '',
    tarif: '',
    description: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer une requête POST au backend
      const response = await axios.post('http://localhost:3001/api/emplacement/add', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si un token est nécessaire
        },
      });

      setSuccess(response.data.message); // Afficher un message de succès
      setError(null);
      setFormData({
        numero: '',
        type: '',
        tarif: '',
        description: '',
      });
    } catch (err) {
      setSuccess(null);
      setError(err.response ? err.response.data.message : 'Erreur lors de la création de l\'emplacement');
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Créer un Emplacement</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="numero">
              <Form.Label>Numéro</Form.Label>
              <Form.Control
                type="number"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Entrez le numéro de l'emplacement"
                required
              />
            </Form.Group>

            <Form.Group controlId="type" className="mt-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Entrez le type (ex : Tente, Mobil-home)"
                required
              />
            </Form.Group>

            <Form.Group controlId="tarif" className="mt-3">
              <Form.Label>Tarif</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="tarif"
                value={formData.tarif}
                onChange={handleChange}
                placeholder="Entrez le tarif (en euros)"
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Entrez une description détaillée"
                rows={3}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Créer l'Emplacement
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AjoutEmplacement;
