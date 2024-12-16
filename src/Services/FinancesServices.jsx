import axios from "axios";

function reservationToday(date) {
    return axios.get(`http://localhost:3001/api/finances/reservations/${date}`);
}

function compterEmplacement() {
    return axios.get(`http://localhost:3001/api/finances/emplacements`);
}

export default {reservationToday, compterEmplacement}