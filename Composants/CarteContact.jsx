import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Archivage } from '../src/Services/ContactService';

function ContactCard({ nom, message, mail, idContact, }) {
  const handleArchive = async () => {
    try {
      await Archivage(idContact); // Appel de l'API
      alert("Message archivé avec succès !");
      window.location.reload(); // Rafraîchissement de la page pour afficher les modifications
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      alert("Une erreur s'est produite lors de l'archivage.");
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>De : {nom}</Card.Title>
        <Card.Text>
          {message}
        </Card.Text>
        <div className='d-flex gap-5'>
          <Button variant="primary" href={`mailto:${mail}`}>
            Répondre
          </Button>
          <Button variant="danger" onClick={handleArchive}>
            Archiver
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ContactCard;
