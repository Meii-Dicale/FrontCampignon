import axios from 'axios';

const API_URL = "http://localhost:3001/api/";

function inscriptions(utilisateur) {
    return axios.post(`http://localhost:3001/api/utilisateur/AjoutUtilisateur`, utilisateur);
  }
  

export default 
inscriptions
;

