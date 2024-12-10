import axios from "axios";
function NouvellesReservations () {
 
    return axios.get ('http://localhost:3001/api/reservations/AllReservations' )
}

export default NouvellesReservations;