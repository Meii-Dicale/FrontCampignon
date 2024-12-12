import axios from 'axios';



function photos(id) {
    return axios.get(`http://localhost:3001/api/services/photoEmplacement/${id}`);
  }
  
  function serviceEmplacement(id) {
    return axios.get(`http://localhost:3001/api/services/serviceEmplacement/${id}`);
}


export default {photos, serviceEmplacement}

;

