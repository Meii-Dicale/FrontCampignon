import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import FinanceServices from "../src/Services/FinancesServices";

const FinanceAdminPage = () => {
    const [nbreResas, setNbreResas] = useState(0);
    const [nbreEmplace, setNbreEmplace] = useState(0);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const dateAujourdhui = `${yyyy}-${mm}-${dd}`;

    const fetchReservationToday = async (dateAujourdhui) => {
        try {
            const response = await FinanceServices.reservationToday(dateAujourdhui);
            setNbreResas(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations du jour :", error);
        }
    };

    const fetchNombreEmplace = async () => {
        try {
            const response = await FinanceServices.compterEmplacement();
            setNbreEmplace(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération du nombre d'emplacements :", error);
        }
    };

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
        <div>
            <h2>Taux d'occupation pour le {dateAujourdhui}</h2>
            <Pie data={data} />
        </div>
    );
};

export default FinanceAdminPage;
