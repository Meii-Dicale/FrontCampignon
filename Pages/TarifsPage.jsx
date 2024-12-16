import React, { useEffect, useState } from 'react';
import MyNavbar from '../Composants/Navbar';
import Navbardroite from '../Composants/Navbardroite';
import Footer from '../Composants/footer';
import {
  listeEmplacements,
  photoEmplacement,
} from '../src/Services/apiServices';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TarifsPage = () => {
  const [gallerieData, setGallerieData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadContent = async () => {
      const descriptionData = await listeEmplacements();
      let emplacements = descriptionData.data;
      let nouvGalData = await Promise.all(
        emplacements.map(async (emplacement) => {
          const { idEmplacement, description } = emplacement;
          const photoReq = await photoEmplacement(idEmplacement);
          const photoData = photoReq.data[0];
          return { idEmplacement, description, ...photoData };
        })
      );
      setGallerieData(nouvGalData);
    };
    loadContent();
  }, []);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gallerieData.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [gallerieData.length]);

  useEffect(() => {
    const adjustNavbardroite = () => {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      document.querySelector('.navbardroite').style.top = `${navbarHeight}px`;
    };

    // Ajuster au chargement
    adjustNavbardroite();

    // Ajuster lors du redimensionnement de la fenêtre
    window.addEventListener('resize', adjustNavbardroite);

    return () => {
      window.removeEventListener('resize', adjustNavbardroite);
    };
  }, []);

  return (
    <>
      <MyNavbar />
      <Navbardroite />
      <div className="content-wrapper">
        <Container fluid className="mt-5">
          <Row>
            <Col md={8}>
              <Card className="photo-section w-100" style={{ maxHeight: '70vh' }}>
                <Card.Img
                  src={gallerieData[currentIndex]?.chemin}
                  alt={gallerieData[currentIndex]?.idPhoto}
                  className="img-fluid"
                  style={{ objectFit: 'contain', height: '100%' }}
                />
                <Card.Body>
                  <Card.Text className="description-section">
                    {gallerieData[currentIndex]?.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <div className="thumbnail-container">
                {gallerieData.map((data, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => handleSelect(index)}
                  >
                    <img src={data.chemin} alt={`Thumbnail ${index}`} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default TarifsPage;
