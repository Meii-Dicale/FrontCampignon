import axios from 'axios';



function photos(idEmplacement) {
    return axios.get(`http://localhost:3001/api/services/photoEmplacement`, idEmplacement);
  }
  
  function serviceEmplacement(idEmplacement) {
    return axios.get(`http://localhost:3001/api/services/servicesEmplacement`, idEmplacement);
  }

export default {photos, serviceEmplacement}

;

