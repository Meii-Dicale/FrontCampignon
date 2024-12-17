import React, { useContext, useEffect, useState } from 'react';
import NavbarMonCompte from '../Composants/NavbarMonCompte';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../src/Context/AuthContext';

function MonComptePage() {
  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    mail: '',
    adresse: {
      rue: '',
      codePostal: '',
      ville: '',
      pays: '',
    },
    telephone: '',
    mdp: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {user, setUser} = useContext(AuthContext);


const SupprimerCompte = async () => {
    const token = localStorage.getItem('token');  // Récupérer le token de l'utilisateur dans localStorage
    
    if (!token) {
        alert("Vous devez être connecté pour supprimer votre compte.");
        return;
    }

    if (!user || !user.id) {
        alert("L'utilisateur n'est pas trouvé.");
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:3001/api/utilisateur/` + user.id, {
            headers: {
                Authorization: `Bearer ${token}`,  // Inclure le token dans l'en-tête de la requête
            },
        });

        // Si la suppression est réussie, déconnecter l'utilisateur
        alert(response.data.message); // Afficher le message de succès
        setUser(null);  // Supprimer les informations de l'utilisateur du contexte
        localStorage.removeItem('token');  // Supprimer le token du localStorage

        // Rediriger l'utilisateur vers la page d'accueil après la suppression
        navigate('/');
    } catch (error) {
        console.error("Erreur lors de la suppression du compte:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
};
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

        const response = await axios.get('http://localhost:3001/api/utilisateur/' + user.id, { 
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

  const formatDate = (dateString) => {
    return dateString.slice(0, 10);
  };
  const formattedDate = formatDate(userInfo.dateNaissance);


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
                <Form.Control type="date" value={formattedDate} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={userInfo.mail} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={`${userInfo.rue}, ${userInfo.codePostal}, ${userInfo.ville}, ${userInfo.pays}`}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control type="tel" value={userInfo.tel} readOnly />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Mot de Passe</Form.Label>
                <Form.Control type="password" value={userInfo.mdp} readOnly />
              </Form.Group>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <Button variant="primary">Modifier mes informations</Button>


      <Button variant="danger" onClick={SupprimerCompte}>
        Supprimer mon compte
      </Button>


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