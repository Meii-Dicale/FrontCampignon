import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

const Calendar = () => {
    const [reservations, setReservations] = useState([]);
    const [emplacements, setEmplacements] = useState([]);
    const [weekStart, setWeekStart] = useState(moment().startOf('isoWeek'));

    useEffect(() => {
        // Fetch emplacements
        axios.get('http://localhost:3001/api/emplacement/')
            .then(response => setEmplacements(response.data))
            .catch(error => console.error('Erreur de chargement des emplacements:', error));
        // Fetch reservations
        axios.get('http://localhost:3001/api/reservations/AllReservations') 
            .then(response => setReservations(response.data))
            .catch(error => console.error('Erreur de chargement des réservations:', error));
           
    }, []);
    
    const generateWeekDays = () => {
        return Array.from({ length: 7 }, (_, i) => moment(weekStart).add(i, 'days'));
    };

    const handlePrevWeek = () => {
        setWeekStart(moment(weekStart).subtract(1, 'weeks'));
    };

    const handleNextWeek = () => {
        setWeekStart(moment(weekStart).add(1, 'weeks'));
    };

    const renderReservation = (day, emplacementId) => {
        const reservation = reservations.find(res => {
            return (
                res.idEmplacement === emplacementId &&
                moment(day).isBetween(moment(res.dateEntree), moment(res.dateSortie), null, '[]')
            );
        });

        return reservation ? <span className="reserved">Réservé</span> : null;
    };

    return (
        <div className="calendar" style={{ marginLeft: '250px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '10px' }}>
            <div className="calendar-header">
                <button onClick={handlePrevWeek}>Semaine précédente</button>
                <h2>{`Semaine du ${weekStart.format('DD MMM YYYY')}`}</h2>
                <button onClick={handleNextWeek}>Semaine suivante</button>
            </div>

            <table className="calendar-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}>Emplacement</th>
                        {generateWeekDays().map(day => (
                            <th key={day.format('YYYY-MM-DD')} style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}>{day.format('dddd DD', 'fr')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {emplacements.map(emplacement => (
                        <tr key={emplacement.idEmplacement}>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{`Emplacement ${emplacement.numero}`}</td>
                            {generateWeekDays().map(day => (
                                <td key={day.format('YYYY-MM-DD')} style={{ border: '1px solid #ccc', padding: '10px' }}>
                                    {renderReservation(day, emplacement.idEmplacement)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;