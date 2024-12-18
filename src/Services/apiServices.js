import axios from "axios";

const API_URL = 'http://localhost:3001/api'; // URL de l'API

function listeEmplacements() {
    return axios.get(`${API_URL}/emplacement/`);
}

function listeServices() {
    return axios.get(`${API_URL}/services/services`);
}

function listeServicesEmplacements(id) {
    return axios.get(`${API_URL}/services/serviceEmplacement/${id}`);
}

function photoEmplacement(id) {
    return axios.get(`${API_URL}/services/photoEmplacement/${id}`)
}

function infosUtilisateur(id) {
    return axios.get(`${API_URL}/utilisateur/${id}`);
}

export default listeEmplacements;
export {
    listeEmplacements,
    listeServices, 
    listeServicesEmplacements,
    photoEmplacement,
    infosUtilisateur
}