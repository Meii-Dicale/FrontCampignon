import axios from 'axios';



function photos(id) {
    return axios.get(`http://localhost:3001/api/services/photoEmplacement/${id}`);
  }

  function photoApi (imageName) {
    return axios.get(`http://localhost:3001/api/photo/${imageName}`);
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

function SupprimerAssociation(idEmplacement){
return axios.delete(`http://localhost:3001/api/services/supprimerAssociationServiceEmplacement/${idEmplacement}`)
}

function associerServiceEmplacement(idService, idEmplacement) {
    const data = {
        idService: idService,
        idEmplacement: idEmplacement}
    
    return axios.post(`http://localhost:3001/api/services/associerServiceEmplacement/`, data );
}
function uploadPhoto(id, filePath) {
    return axios.post(`http://localhost:3001/api/emplacement/upload/${id}`, filePath);
}

function supprimerEmplacement(id) {
    return axios.delete(`http://localhost:3001/api/emplacement/${id}`);
}
function creerEmplacement(data) {
    const envoi = {
        numero: data.numero,
        type: data.type,
        tarif: data.tarif,
        description: data.description
    }
    return axios.post(`http://localhost:3001/api/emplacement/add`, envoi);
}

function updateService(data) {
    const envoi = {
        libelle: data.libelle,
        stock: data.stock,
        tarif: data.tarif,
        idService: data.idService
    }
    return axios.put(`http://localhost:3001/api/services/modifierService`, envoi);
}
function supprimerService(idService) {
    return axios.delete(`http://localhost:3001/api/services/supprimerService/${idService}`);
}



export default {photoApi ,photos, serviceEmplacement, infoEmplacement, AllServices, modifierEmplacement, associerServiceEmplacement, SupprimerAssociation, uploadPhoto, creerEmplacement, supprimerEmplacement, updateService,supprimerService};

