import React, { useEffect, useState } from 'react';
import NavbarMonCompte from '../Composants/NavbarMonCompte';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MonComptePage() {
  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    adresse: {
      rue: '',
      codePostal: '',
      ville: '',
      pays: '',
    },
    telephone: '',
    motDePasse: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Récupération des informations utilisateur depuis l'API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Vous devez être connecté pour voir vos informations.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3001/api/utilisateur/' + id, { // Remplacez "1" par l'ID de l'utilisateur connecté
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des informations de l'utilisateur.");
        setLoading(false);
        console.log(err);
        
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavbarMonCompte />
      <Container className="pt-5 mt-5">
        <h1 className="text-center mb-4 d-none d-md-block">Mes infos</h1>
        <h2 className="text-center mb-4 d-block d-md-none" style={{ fontSize: '2rem' }}>Mes Infos</h2>
        <Row>
          {/* Section des informations personnelles */}
          <Col md={6}>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" value={userInfo.nom} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Prénom</Form.Label>
                <Form.Control type="text" value={userInfo.prenom} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Date de Naissance</Form.Label>
                <Form.Control type="date" value={userInfo.dateNaissance} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={userInfo.email} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={`${userInfo.adresse.rue}, ${userInfo.adresse.codePostal}, ${userInfo.adresse.ville}, ${userInfo.adresse.pays}`}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control type="tel" value={userInfo.telephone} readOnly />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Mot de Passe</Form.Label>
                <Form.Control type="password" value={userInfo.motDePasse} readOnly />
              </Form.Group>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <Button variant="primary">Modifier mes informations</Button>
                <Button variant="danger">Supprimer mon compte</Button>
              </div>
            </Form>
          </Col>

          {/* Section des bulles d'action */}
          <Col lg={4} className="d-flex flex-wrap justify-content-center align-items-start mt-5 gap-3">
            <Button
              className="btn-light"
              style={{ width: '200px', height: '100px' }}
              onClick={() => navigate('/facture')}
            >
              Mes factures
            </Button>
            <Button
              className="btn-light"
              style={{ width: '200px', height: '100px' }}
              onClick={() => navigate('/reservations')}
            >
              Mes réservations
            </Button>
            <Button
              className="btn-light"
              style={{ width: '200px', height: '100px' }}
              onClick={() => navigate('/promo')}
            >
              Voir les offres
            </Button>
            <Button
              className="btn-light"
              style={{ width: '200px', height: '100px' }}
              onClick={() => navigate('/carte')}
            >
              Carte du camping
            </Button>
          </Col>
        </Row>

        {/* Bouton Réserver */}
        <div className="text-center mt-5">
          <Button variant="success" style={{ width: '200px', height: '50px' }}>
            Réserver
          </Button>
        </div>
      </Container>
    </>
  );
}

export default MonComptePage;