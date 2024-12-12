import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import EmplacementServices from '../src/Services/EmplacementServices'; 
import { Container } from 'react-bootstrap';

function EmplacementAdminCard({ numero, tarif, type, idEmplacement }) {

    const [services, setServices] = useState([]);
    const [photographies, setPhotographies] = useState([]);

    // Récupérer les services pour un emplacement
    const fetchServices = async () => {
        try {
            const response = await EmplacementServices.serviceEmplacement(idEmplacement); 
            setServices(response.data);
        }
        catch (error) {
            console.error(error);
        }
    };

    // Récupérer les photos pour un emplacement
    const fetchPhotos = async () => {
        try {
            const response = await EmplacementServices.photos(idEmplacement); 
            setPhotographies(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchPhotos();
    }, [idEmplacement]);

  return (
    <Container style={{
        marginLeft: "250px",
        width: "75%"
    }}>
    <Card className='d-flex flex-row'>
        {photographies.length > 0 && (
            <div>
                {photographies.map((photographie, index) => (
                 <Card.Img key={index} variant="top" src={`../src/assets/${photographie.chemin}`} />
                ))}
            </div>
        )}
        <Card.Body>
            <Card.Title>Emplacement n° {numero}</Card.Title>
            <div><Card.Text>
               
                    Tarif : {tarif} €
                    <br />
                    Type : {type}
                    <br />
                    Équipements disponibles :
               
                        {services.length > 0 ? (
                            services.map((service, index) => (
                                <li key={index}>{service.libelle}</li>
                            ))
                        ) : (
                            <li>Aucun équipement disponible</li>
                        )}
                   
            </Card.Text>
            </div>

        </Card.Body>
    </Card>
    </Container>
  );
}

export default EmplacementAdminCard;
