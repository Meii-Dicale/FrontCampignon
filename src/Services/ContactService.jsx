import axios from "axios";
function Contact () {
 
    return axios.get ('http://localhost:3001/api/contact/NouveauxMessages' )
}

function Archivage (idContact) {
  
    return axios.post ('http://localhost:3001/api/contact/Archiver', {idContact} )
}

function VoirArchives() {
    return axios.get ('http://localhost:3001/api/contact/MessagesArchives' )
}

function Supprimer (idContact) {
    return axios.delete (`http://localhost:3001/api/contact/supprimer/${idContact}`)
}
export default Contact;
export { Archivage, VoirArchives, Supprimer};