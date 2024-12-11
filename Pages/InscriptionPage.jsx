import { useState } from 'react';
import { Button, Container, InputGroup, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../src/Services/AuthServices';

const Inscription = () => {
  const [utilisateur, setUtilisateur] = useState({
    nom: '',
    prenom: '',
    rue: '',
    codePostal: '',
    ville: '',
    pays: '',
    tel: '',
    mail: '',
    dateNaissance: '',
    mdp: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUtilisateur({ ...utilisateur, role: 'client' });
      console.log(utilisateur);
      // Appelez la méthode d'inscription du service avec les données de l'utilisateur
      await AuthServices.inscription(utilisateur); // Assurez-vous que le service d'inscription soit bien défini ailleurs dans votre code.
      console.log(utilisateur);
      navigate('/'); // Redirige vers la page d'accueil ou la page souhaitée après l'inscription
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-3">
      <div className="d-flex align-items-center justify-content-between w-100">
        <img src="../logo camping.png" alt="Logo" style={{ height: '60px' }} />

        <h1>Inscription</h1>
        <Link
          to="/"
          className="ms-3"
          style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem' }}
        >
          Acceuil
        </Link>
      </div>

      <Form className="col-10 mt-3" onSubmit={handleSubmit}>
        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Nom"
            name="nom"
            value={utilisateur.nom}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Prénom"
            name="prenom"
            value={utilisateur.prenom}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Rue"
            name="rue"
            value={utilisateur.rue}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Code Postal"
            name="codePostal"
            value={utilisateur.codePostal}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Ville"
            name="ville"
            value={utilisateur.ville}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Pays"
            name="pays"
            value={utilisateur.pays}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Téléphone"
            name="tel"
            value={utilisateur.tel}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Email"
            type="email"
            name="mail"
            value={utilisateur.mail}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <InputGroup.Text>Date de Naissance</InputGroup.Text>
          <Form.Control
            placeholder="Date de Naissance"
            type="date"
            name="dateNaissance"
            value={utilisateur.dateNaissance}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Mot de Passe"
            type="password"
            name="mot_de_passe"
            value={utilisateur.mot_de_passe}
            onChange={handleChange}
            required
          />
        </InputGroup>

        {/* <InputGroup className="mb-3">
        {/* <InputGroup className="mb-3">
                    <InputGroup.Text>Rôle</InputGroup.Text>
                    <Form.Control
                        placeholder="Rôle (par exemple, 'utilisateur')"
                        name="role"
                        value={utilisateur.role}
                        onChange={handleChange}
                        required
                    />
                </InputGroup> */}

        <Button type="submit" variant="primary">
          S&apos;inscrire
        </Button>
      </Form>
    </Container>
  );
};

export default Inscription;
