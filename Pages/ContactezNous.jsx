import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Navbar } from 'react-bootstrap';
import Navbardroite from '../Composants/Navbardroite';
import MyNavbar from '../Composants/Navbar';
import { Envoyer } from '../src/Services/ContactService';

function ContactezNousPage() {
  const [formData, setFormData] = useState({
    nom: '',
    mail: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Préparation du FormData
    const formdata = new FormData();
    formdata.append('nom', formData.nom);
    formdata.append('mail', formData.mail);
    formdata.append('message', formData.message);

try {
    const response = Envoyer(formData)

    
} catch (error) {
    console.error(error);
    alert('Erreur lors de l\'envoi du message');
  
}}

  return (
    <>
      <MyNavbar />
      <Navbardroite />
      <Container fluid className="pt-5 mt-5">
        {/* Titre de la page */}
        <h1 className="text-center mb-4">Contact</h1>

        {/* Formulaire de contact */}
        <div className="contact-form bg-light p-4 rounded shadow-sm mt-4 mx-auto" style={{ maxWidth: '500px' }}>
          <h5 className="mb-3 text-center">Envoyez-nous un message</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="mail"
                placeholder="Email"
                value={formData.mail}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="primary" type="submit">
                Envoyer
              </Button>
            </div>
          </Form>
        </div>
      </Container>

      <Container fluid className="pt-5 ">

        {/* Section des informations */}
        <div className="contact-bubbles d-flex flex-wrap justify-content-center gap-3 p-3">
          <div className="bubble">
            <p className="mb-0">Adresse du camping</p>
            <p className="small">123 Rue Principale, 75001 Paris</p>
          </div>
          <div className="bubble">
            <p className="mb-0">Numéro de téléphone</p>
            <p className="small">+33 6 12 34 56 78</p>
          </div>
          <div className="bubble">
            <p className="mb-0">Email</p>
            <p className="small">contact@camping.com</p>
          </div>
          <div className="bubble">
            <p className="mb-0">Horaires d'ouverture</p>
            <p className="small">8h00 - 22h00</p>
          </div>
        </div>

        {/* Section des réseaux sociaux */}
        <Row className="justify-content-center mt-4">
          <Col md={6} className="bg-light p-4 rounded shadow-sm">
            <h5 className="mb-3">Suivez-nous sur les réseaux sociaux</h5>
            <Row className="gx-3 gy-3">
              <Col xs={6} md={3}>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline-secondary" className="w-100 rounded-circle p-3">
                    Facebook
                  </Button>
                </a>
              </Col>
              <Col xs={6} md={3}>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline-secondary" className="w-100 rounded-circle p-3">
                    Instagram
                  </Button>
                </a>
              </Col>
              <Col xs={6} md={3}>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline-secondary" className="w-100 rounded-circle p-3">
                    TikTok
                  </Button>
                </a>
              </Col>
              <Col xs={6} md={3}>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline-secondary" className="w-100 rounded-circle p-3">
                    YouTube
                  </Button>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        </Container>
    </>
  );
}

export default ContactezNousPage;
