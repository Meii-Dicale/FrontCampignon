import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import FinanceServices from "../src/Services/FinancesServices";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Chart from "chart.js/auto";

const FinanceAdminPage = () => {
    const [nbreResas, setNbreResas] = useState(0);
    const [nbreEmplace, setNbreEmplace] = useState(0);
    const [revenu, setRevenu] = useState("jour");
    const [revenue, setRevenue] = useState([]);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const dateAujourdhui = `${yyyy}-${mm}-${dd}`;

    const fetchReservationToday = async (dateAujourdhui) => {
        try {
            const response = await FinanceServices.reservationToday(dateAujourdhui);
            setNbreResas(response.data.reservations);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations du jour :", error);
        }
    };

    const fetchNombreEmplace = async () => {
        try {
            const response = await FinanceServices.compterEmplacement();
            setNbreEmplace(response.data.Emplacements);
        } catch (error) {
            console.error("Erreur lors de la récupération du nombre d'emplacements :", error);
        }
    };

    const fetchRevenueToday = async () => {
        try {
            const response = await FinanceServices.totalDuJour();
            setRevenue(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des revenus du jour :", error);
        }
    };

    const fetchRevenueWeek = async () => {
        try {
            const response = await FinanceServices.totalDeLaSemaine();
            setRevenue(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des revenus de la semaine :", error);
        }
    };

    const fetchRevenueMonth = async () => {
        try {
            const response = await FinanceServices.totalDuMois();
            setRevenue(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des revenus du mois :", error);
        }
    };

    useEffect(() => {
        if (revenu === "jour") fetchRevenueToday();
        else if (revenu === "semaine") fetchRevenueWeek();
        else if (revenu === "mois") fetchRevenueMonth();
    }, [revenu]);

    useEffect(() => {
        fetchReservationToday(dateAujourdhui);
        fetchNombreEmplace();
    }, [dateAujourdhui]);

    const occupationRate = nbreEmplace > 0 ? (nbreResas / nbreEmplace) * 100 : 0;

    const data = {
        labels: ['Occupied', 'Available'],
        datasets: [
            {
                data: [occupationRate, 100 - occupationRate],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    return (
        <Container className="mt-1 col-8">
         
            <Row className="mb-4">
                <Col md={6} className="d-flex justify-content-center">
                    <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                        <Card.Body>
                            <Card.Title className="text-center">Taux d'occupation</Card.Title>
                            <Pie data={data} />
                            <Card.Text className="mt-3 text-center">
                                Pour le <strong>{dateAujourdhui}</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <Card className="p-4 shadow mb-4">
                        <Card.Body>
                            <Card.Title className="text-center">Statistiques</Card.Title>
                            <Card.Text>
                                <strong>Nombre de réservations :</strong> {nbreResas}
                            </Card.Text>
                            <Card.Text>
                                <strong>Nombre d'emplacements :</strong> {nbreEmplace}
                            </Card.Text>
                            <Card.Text>
                                <strong>Taux d'occupation :</strong> {occupationRate.toFixed(2)}%
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4 text-center">
                <Col>
                    <Button variant="primary" onClick={() => setRevenu("jour")} className="m-2">
                        Revenus du jour
                    </Button>
                    <Button variant="success" onClick={() => setRevenu("semaine")} className="m-2">
                        Revenus de la semaine
                    </Button>
                    <Button variant="warning" onClick={() => setRevenu("mois")} className="m-2">
                        Revenus du mois
                    </Button>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    {revenu && (
                        <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
                            <Card.Body>
                                <Card.Title>Revenus ({revenu})</Card.Title>
                                <Card.Text>
                                    <strong>Total :</strong> {revenue.somme_tarifs} €
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
            <Row className="mt-4 text-center">
                <Col>
                    <Button variant="secondary" href="/InscriptionAdmin">
                        Ajouter un agent ou un client
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default FinanceAdminPage;
