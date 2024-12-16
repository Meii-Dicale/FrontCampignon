import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:3001/api'; // URL de l'API

function loginUser(user) {
  return axios.post(`${API_URL}/login/loginUser`, user);
}

function inscription(user) {
  return axios.post(`${API_URL}/utilisateur/AjoutUtilisateur`, user);
}

function setAxiosToken() {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
}

const decodeToken = (token) => {
  try {
    return jwtDecode(token); // Décodage du token
  } catch (err) {
    console.error(err);
    throw new Error('Invalid token'); // Si le token est invalide, on lève une erreur
  }
};

function getUser() {
  const token = localStorage.getItem('token');
  if (token && isValid()) {
    const decodedToken = jwtDecode(token);
    return {
      nom: decodedToken.nom,
      prenom: decodedToken.prenom,
      role: decodedToken.role,
      id: decodedToken.idUtilisateur,
    };
  } else {
    return {};
  }
}

function logout() {
  delete axios.defaults.headers['Authorization'];
  localStorage.removeItem('token');
  localStorage.setItem('loggedOut', 'true'); // Ajout d'un indicateur
  console.log('Logged out successfully');

  // Redirection au lieu de recharger
  window.location.href = '/'; // Modifiez la route en fonction de votre projet
}

let isTokenValidCache = null;

function isValid() {
  if (isTokenValidCache !== null) {
    return isTokenValidCache;
  }

  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < new Date().getTime();
    if (isExpired) {
      // Empêcher une déconnexion répétée
      if (!localStorage.getItem('loggedOut')) {
        logout();
      }
      isTokenValidCache = false;
      return false;
    } else {
      setAxiosToken();
      isTokenValidCache = true;
      return true;
    }
  } else {
    // Empêcher une déconnexion répétée
    if (!localStorage.getItem('loggedOut')) {
      logout();
    }
    isTokenValidCache = false;
    return false;
  }
}

export default { loginUser, decodeToken, logout, isValid, inscription, getUser };