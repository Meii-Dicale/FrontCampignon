import axios from "axios";
function NouvellesReservations () {
 
    return axios.get ('http://localhost:3001/api/reservations/AllReservations' )
}
function ChangerDatesReservations (dateEntree, dateSortie , idReservation) {
    const data = {dateEntree , dateSortie, idReservation}
    return axios.put ('http://localhost:3001/api/reservations/UpdateReservation', data )
}

function fetchReservations () {
    return axios.get('http://localhost:3001/api/reservations/AllReservations');
}

function fetchEmplacements () {
     return  axios.get('http://localhost:3001/api/emplacement/');

}
function ValiderResa (id) {
    return axios.put(`http://localhost:3001/api/reservations/ValiderReservation/${id}`);
}

function DeleteReservation (id) {
    return axios.delete(`http://localhost:3001/api/reservations/DeleteReservation/${id}`);
}

function ReservationById (idReservation) {
    return axios.get(`http://localhost:3001/api/reservations/${idReservation}`);
}
function ajouterResa () {
    return axios.post(`http://localhost:3001/api/reservations/AddReservation`)
}

function resaParEmplacement (idEmplacement) {
    return axios.get(`http://localhost:3001/api/reservations/ReservationsEmplacement/${idEmplacement}`);
}

export default NouvellesReservations;
export { fetchReservations, fetchEmplacements };
export { ChangerDatesReservations , ValiderResa, DeleteReservation, ReservationById};
export { ajouterResa, resaParEmplacement};