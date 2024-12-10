import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Ajout de useNavigate pour la redirection
import axios from "axios"; // Pour les requêtes API

const Connexion = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        mot_de_passe: "",
    });
    const [error, setError] = useState(""); // Pour afficher les erreurs de connexion
    const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger l'utilisateur

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envoi de la requête de connexion avec les informations de l'utilisateur
            const response = await axios.post("http://localhost:3001/api/connexion", credentials);
            
            // Si la connexion est réussie, redirige vers la page d'accueil
            if (response.status === 200) {
                console.log("Connexion réussie !");
                navigate("/");  // Redirection vers la page d'accueil
            }
        } catch (error) {
            // En cas d'erreur de connexion, afficher un message
            setError("Email ou mot de passe incorrect !");
            console.error("Erreur de connexion:", error);
        }
    };

    return (
        <>
        <Container className="d-flex flex-column align-items-center mt-3">

            <div className="d-flex align-items-center justify-content-between w-100">
                <img
                    src="../logo camping.png" 
                    alt="Logo"
                    style={{ height: '60px' }} 
                />   

                <h1>Connexion</h1>

                <Link to="/" className="ms-3" style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem' }}>
                    Accueil
                </Link>
            </div>

            
            
                {error && <div className="alert alert-danger mt-3">{error}</div>}

                <Form className="col-10 mt-3" onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Entrez votre email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control
                            type="password"
                            name="mot_de_passe"
                            placeholder="Entrez votre mot de passe"
                            value={credentials.mot_de_passe}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <Button type="submit" variant="primary">
                        Se connecter
                    </Button>
                </Form>

                <div className="mt-3">
                    <p>
                        Vous n'avez pas de compte ?{" "}
                        <Link to="/inscription" style={{ textDecoration: "none" }}>
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </Container>
        </>
    );
};

export default Connexion;