import axios from "axios";

const API_URL = 'http://localhost:3001/api'; // URL de l'API

function listeEmplacements() {
    return axios.get(`${API_URL}/emplacement/`);
}

export default listeEmplacements;