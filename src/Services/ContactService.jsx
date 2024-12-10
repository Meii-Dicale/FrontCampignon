import axios from "axios";
function Contact () {
 
    return axios.get ('http://localhost:3001/api/contact/NouveauxMessages' )
}

function Archivage (idContact) {
  
    return axios.post ('http://localhost:3001/api/contact/Archiver', {idContact} )
}


export default Contact;
export { Archivage};