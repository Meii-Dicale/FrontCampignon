import axios from 'axios';

const API_URL = "http://localhost:3001/api";

function inscription(utilisateur) {
    return axios.post(`${API_URL}/inscription`, utilisateur);
  }
  

export default {
inscription
};

