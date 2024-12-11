import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
    return jwtDecode(token); // décodage du token
  } catch (err) {
    console.error(err);
    throw new Error('Invalid token'); // si le token est invalide, on lève une erreur
  }
};

function getUser() {
  const token = localStorage.getItem('token');
  if (token && isValid()) {
    const decodedToken = jwtDecode(token);
    return {
      nom: decodedToken.nom,
      prenom: decodedToken.prenom,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  } else {
    return {};
  }
}

function logout() {
  delete axios.defaults.headers['Authorization'];
  localStorage.removeItem('token');
  console.log('Logged out successfully');
  window.location.href = '/' // redirection vers la page d'accueil
}

function isValid() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      logout();
      return false;
    } else {
      setAxiosToken();
      return true;
    }
  } else {
    return false;
  }
}

export default { loginUser, decodeToken, logout, isValid, inscription, getUser };
