import { useState, useEffect } from 'react';
import { Card, Container, Carousel } from 'react-bootstrap';
import EmplacementServices from '../src/Services/EmplacementServices'; 
import { useNavigate } from 'react-router-dom';  

function EmplacementAdminCard({ numero, tarif, type, idEmplacement }) {
    const [services, setServices] = useState([]);
    const [photographies, setPhotographies] = useState([]);
    const navigate = useNavigate();  

    // Récupérer les services pour un emplacement
    const fetchServices = async () => {
        try {
            const response = await EmplacementServices.serviceEmplacement(idEmplacement); 
            setServices(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Récupérer les photos pour un emplacement
    const fetchPhotos = async () => {
        try {
            const response = await EmplacementServices.photos(idEmplacement); 
            setPhotographies(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchPhotos();
    }, [idEmplacement]);

    const handleCardClick = () => {
        navigate(`/emplacementsAdmin/${idEmplacement}`);  
    };

    return (
        <Container style={{ width: "75%" }}>
            <Card className='d-flex flex-row transparence' onClick={handleCardClick}> 
                {photographies.length > 0 && (
                    <Carousel style={{ width: "50%" }}>
                        {photographies.map((photographie, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={"http://localhost:3001/api/photo" + photographie.chemin}
                                    alt={`Photographie ${index + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
                <Card.Body>
                    <Card.Title>Emplacement n° {numero}</Card.Title>
                    <Card.Text>
                        Tarif : {tarif} €
                        <br />
                        Type : {type}
                        <br />
                        Équipements disponibles :
                        {services.length > 0 ? (
                            services.map((service, index) => (
                                service && service.libelle ? (
                                    <li key={index}>{service.libelle}</li>
                                ) : (
                                    <span><br />Aucun équipement disponible</span>
                                )
                            ))
                        ) : (
                            <li>Aucun équipement disponible</li>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EmplacementAdminCard;
