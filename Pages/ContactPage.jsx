import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import NavbarMonCompte from '../Composants/NavbarMonCompte';
import AuthContext from '../src/Context/AuthContext';
import axios from 'axios';

function ContactPage() {
  const { user } = useContext(AuthContext); // Récupération du contexte utilisateur
  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    mail: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Récupération des informations utilisateur
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user || !user.id) {
        setError("Utilisateur non connecté.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/utilisateur/` +user.id, {
          headers: { Authorization: `Bearer ${token}` },
        });

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

    fetchUserInfo();
  }, [user]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        nom: userInfo.nom,
        mail: userInfo.mail,
        message: message,
      };

      // Appel à la route d'envoi de message
      const response = await axios.post('http://localhost:3001/api/contact/EnvoiMessages', data);

      if (response.data.message) {
        setShowModal(true); // Affiche le modal de confirmation
        setTimeout(() => {
          window.location.reload(); // Recharge la page après un délai
        }, 2000);
      }
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message :', err);
      setError("Impossible d'envoyer le message.");
    }
  };

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
        <h1 className="text-center mb-4">Contact</h1>

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