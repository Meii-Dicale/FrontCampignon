import axios from "axios";

function reservationToday(date) {
    return axios.get(`http://localhost:3001/api/finances/reservations/${date}`);
}

function compterEmplacement() {
    return axios.get(`http://localhost:3001/api/finances/emplacements`);
}
function totalDuJour() {
    return axios.get(`http://localhost:3001/api/finances/totalDuJour`);
}
function totalDeLaSemaine() {
    return axios.get(`http://localhost:3001/api/finances/totalDeLaSemaine`);
}
function totalDuMois () {
    return axios.get(`http://localhost:3001/api/finances/totalDuMois`);
}

export default {reservationToday, compterEmplacement, totalDuJour, totalDeLaSemaine, totalDuMois}