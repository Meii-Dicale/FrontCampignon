import axios from "axios";
function NouvellesReservations () {
 
    return axios.get ('http://localhost:3001/api/reservations/AllReservations' )
}
function ChangerDatesReservations (dateEntree, dateSortie , idReservation) {
    const data = {dateEntree , dateSortie, idReservation}
    return axios.put ('http://localhost:3001/api/reservations/UpdateReservation', data )
}

export default NouvellesReservations;
export { ChangerDatesReservations };