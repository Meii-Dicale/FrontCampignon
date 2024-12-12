import axios from 'axios';



function photos(id) {
    return axios.get(`http://localhost:3001/api/services/photoEmplacement/${id}`);
  }
  
  function serviceEmplacement(id) {
    return axios.get(`http://localhost:3001/api/services/serviceEmplacement/${id}`);
}
function infoEmplacement(id) {
    return axios.get(`http://localhost:3001/api/emplacement/${id}`);
}

function AllServices() {
    return axios.get(`http://localhost:3001/api/services/services`);
}
function modifierEmplacement(id, data) {
    return axios.patch(`http://localhost:3001/api/emplacement/${id}`, data);
}

function associerServiceEmplacement(idService, idEmplacement) {
    const data = {
        idService: idService,
        idEmplacement: idEmplacement}
    
    return axios.post(`http://localhost:3001/api/services/associerServiceEmplacement/`, data );
}


export default {photos, serviceEmplacement, infoEmplacement, AllServices, modifierEmplacement, associerServiceEmplacement}

;

