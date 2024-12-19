import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import NavbarMonCompte from '../Composants/NavbarMonCompte';
import AuthContext from '../src/Context/AuthContext'; 
import axios from 'axios'; 

function ContactPage() {
  const { user } = useContext(AuthContext);  // Récupération du contexte pour l'utilisateur
  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    mail: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Effect hook pour récupérer les informations de l'utilisateur via l'API
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user || !user.id) {
        setError("Utilisateur non connecté.");
        setLoading(false);
        return;
      }

      try {
        // Appel à l'API pour récupérer les informations de l'utilisateur
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/utilisateur/` +user.id, {
          headers: { Authorization: `Bearer ${token}` }, // Ajouter le token dans les en-têtes
        });

        // Mise à jour des informations utilisateur dans l'état
        setUserInfo({
          nom: response.data.nom || '',
          prenom: response.data.prenom || '',
          mail: response.data.mail || '',
        });

        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des informations.");
        setLoading(false);
      }
    };

    fetchUserInfo(); // Lancer la récupération des données
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logique pour envoyer le message à l'API ou à un service d'email
    console.log("Message envoyé :", { ...userInfo, message });
    // Ajouter ici la logique pour envoyer le message au camping via l'API

    setShowModal(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000); 

  };

  // Gestion du chargement et des erreurs
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavbarMonCompte />
      <Container fluid className="pt-5 mt-5">
        {/* Titre de la page */}
        <h1 className="text-center mb-4">Contact</h1>

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
            <p className="small">contact@campingnon.com</p>
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

        {/* Formulaire de contact */}
        <div className="contact-form bg-light p-4 rounded shadow-sm mt-4 mx-auto" style={{ maxWidth: '500px' }}>
          <h5 className="mb-3 text-center">Envoyez-nous un message</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="nom"
                value={userInfo.nom}
                onChange={(e) => setUserInfo({ ...userInfo, nom: e.target.value })}
                placeholder="Nom"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="prenom"
                value={userInfo.prenom}
                onChange={(e) => setUserInfo({ ...userInfo, prenom: e.target.value })}
                placeholder="Prénom"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="mail"
                value={userInfo.mail}
                onChange={(e) => setUserInfo({ ...userInfo, mail: e.target.value })}
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Votre message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
 {/* Modale de confirmation */}
 <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Votre message a été envoyé avec succès !</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>




    </>
  );
}

export default ContactPage;