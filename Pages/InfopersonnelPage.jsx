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
  const [isEditing, setIsEditing] = useState(false);
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
        const response = await axios.delete(`http://localhost:3001/api/utilisateur/utilisateur/` + user.id, {
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

  // const formatDate = (dateString) => {
  //   return dateString.slice(0, 10);
  // };
  // const formatedDate = formatDate(userInfo.dateNaissance);


  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  // Fonction pour gérer la modification
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        `http://localhost:3001/api/utilisateur/utilisateur/` +user.id,
        userInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data.message || "Informations mises à jour avec succès !");
      setIsEditing(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour des informations:", err);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log("User ID:", user.id);

  return (
    <>
      <NavbarMonCompte />
      <Container className="pt-5 mt-5">
        <h1 className="text-center mb-4">Mes Infos</h1>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="nom"
                  value={userInfo.nom}
                  readOnly={!isEditing}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  name="prenom"
                  value={userInfo.prenom}
                  readOnly={!isEditing}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Date de Naissance</Form.Label>
                <Form.Control
                  type="date"
                  name="dateNaissance"
                  value={userInfo.dateNaissance.slice(0, 10)}
                  readOnly={!isEditing}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="mail"
                  value={userInfo.mail}
                  readOnly={!isEditing}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  name="rue"
                  value={userInfo.rue}
                  readOnly={!isEditing}
                  onChange={handleChange}
                  placeholder="Rue"
                />
                                <Form.Label>Code postal</Form.Label>

                <Form.Control
                  type="text"
                  name="codePostal"
                  value={userInfo.codePostal}
                  readOnly={!isEditing}
                  onChange={handleChange}
                  placeholder="Code Postal"
                  className="mt-2"
                />
                                <Form.Label>Ville</Form.Label>

                <Form.Control
                  type="text"
                  name="ville"
                  value={userInfo.ville}
                  readOnly={!isEditing}
                  onChange={handleChange}
                  placeholder="Ville"
                  className="mt-2"
                />
                                <Form.Label>Pays</Form.Label>

                <Form.Control
                  type="text"
                  name="pays"
                  value={userInfo.pays}
                  readOnly={!isEditing}
                  onChange={handleChange}
                  placeholder="Pays"
                  className="mt-2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  name="tel"
                  value={userInfo.tel}
                  readOnly={!isEditing}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex align-items-center justify-content-center gap-3">
                {isEditing ? (
                  <>
                    <Button variant="success" onClick={handleSave}>
                      Sauvegarder
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                      Annuler
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" onClick={handleEdit}>
                      Modifier mes informations
                    </Button>
                    <Button variant="danger" onClick={SupprimerCompte}>
                      Supprimer mon compte
                    </Button>
                  </>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MonComptePage;