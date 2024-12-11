import { useContext, useState } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import AuthContext from '../src/Context/AuthContext';
import AuthServices from '../src/Services/AuthServices';

const Login = ({ setShowLoginModal }) => {
  // déclaration des variables et constantes
  const [user, setUser] = useState({ mail: '', mdp: '' }); // identifiants de cnx
  const {
    setIsAuthenticated,
    setUser: setAuthUser,
    isAuthenticated,
  } = useContext(AuthContext); // initialisation des etats d'authentification

  // gère les changements dans les champs du formulaire, sans recharger la page
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // empèche le rechargement de la page
    try {
      const res = await AuthServices.loginUser(user); // appel au service de connexion
      localStorage.setItem('token', res.data.token); // sauvegarde du token renvoyé par le serveur
      console.log('Token saved'); // console pour tracer l'étape

      setIsAuthenticated(true); // mise à jour du contexte
      setAuthUser(res.data.user); // mise à jour du contexte
      console.log('res.data :' + res.data)
      console.log('isAuthenticated :', isAuthenticated);

      setShowLoginModal(false); // fermeture de la modal
    } catch (err) {
      console.error(err);
    }
  };
  // formulaire
  return (
    <Container className="d-flex flex-column align-items-center">
      <h1>Connexion</h1>
      {/* appel de la fonction de validation */}
      <Form className="col-6 mt-3" onSubmit={handleSubmit}>
        {' '}
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
          <Form.Control
            aria-describedby="basic-addon2"
            aria-label="mail"
            name="mail"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {/* handleChange = appel de la fonction de mise à jour de la variable */}
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            aria-label="password"
            aria-describedby="basic-addon2"
            name="mdp"
          />
        </InputGroup>
        <Form.Control
          type="submit"
          value="Se connecter"
          className="btn btn-success"
        />
        <p className="mt-3">
          Vous n&apos;avez pas de compte?{' '}
          <a href="/Inscription">Formulaire d&apos;inscription</a>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
