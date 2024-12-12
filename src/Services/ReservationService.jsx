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

export default NouvellesReservations;
export { fetchReservations, fetchEmplacements };
export { ChangerDatesReservations };