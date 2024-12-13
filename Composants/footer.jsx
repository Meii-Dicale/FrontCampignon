import { Container, Card } from 'react-bootstrap';
import {
  Facebook,
  Instagram,
  Tiktok,
  TwitterX,
  Whatsapp,
  Youtube,
} from 'react-bootstrap-icons';

function Footer() {
  return (
    <footer className="mt-3">
      <Container
        fluid
        className="d-flex align-items-between"
        style={{ marginRight: '10vw' }}
      >
        <Card className="pt-2 px-4">
          <p className="mb-0">Adresse du camping</p>
          <p className="small">123 Rue Principale, 75001 Paris</p>
        </Card>
        <Card className="pt-2 px-4">
          <p className="mb-0">Numéro de téléphone</p>
          <p className="small">+33 6 12 34 56 78</p>
        </Card>
        <Card className="pt-2 px-4">
          <p className="mb-0">Email</p>
          <p className="small">contact@camping.com</p>
        </Card>
        <Card className="pt-2 px-4">
          <p className="mb-0">Horaires d'ouverture</p>
          <p className="small">8h00 - 22h00</p>
        </Card>
        <div className="d-flex flex-align-between px-1">
          <Card className="mx-1">
            <Facebook size={69} color="royalblue" />
          </Card>
          <Card className="mx-1">
            <TwitterX size={69} />
          </Card>
          <Card className="mx-1" bg="black">
            <Instagram size={69} color="white" />
          </Card>
          <Card className="mx-1" bg="success">
            <Whatsapp size={69} color="white" />
          </Card>
          <Card className="mx-1">
            <Tiktok size={69} />
          </Card>
          <Card className="mx-1">
            <Youtube color="red" size={69} />
          </Card>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
