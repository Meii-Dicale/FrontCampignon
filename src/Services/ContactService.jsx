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

function Envoyer (data) {
    return axios.post ('http://localhost:3001/api/contact/EnvoiMessages', data )
}
export default Contact;
export { Archivage, VoirArchives, Supprimer, Envoyer};