import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


const AjoutService = () => {
  const [formData, setFormData] = useState({
    libelle: '',
    tarif: '',
    stock: '',
  });

  const handleChange =  (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

try {await creerService(formData)

      setSuccess(response.data.message); // Afficher un message de succès
      setFormData({
        libelle: '',
        tarif: '',
        stock: '',
      });
    }
    catch (error) {
      console.error(error);
    }
    
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Créer un Service</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="libelle">
              <Form.Label>Libellé</Form.Label>
              <Form.Control
                type="text"
                name="libelle"
                value={formData.libelle}
                onChange={handleChange}
                placeholder="Entrez le nom du service"
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

            <Form.Group controlId="stock" className="mt-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Entrez la quantité en stock"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Créer le Service
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AjoutService;