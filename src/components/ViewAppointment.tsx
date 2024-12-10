// src/components/ViewAppointment.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access route parameters
import { getAppointmentById } from './Lib';
import { DataItem } from './DataItem';

const ViewAppointment: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the appointment ID from the URL
    const [appointment, setAppointment] = useState<DataItem>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const data = await getAppointmentById(Number(id)); 
                const formattedData: DataItem = {
                    ID: data.id, 
                    Title: data.title,
                    Description: data.description,
                    LevelOfImportance: data.levelOfImportance,
                    Date: data.date,
                    Time: data.time,
                    Address: data.address,
                };
                setAppointment(formattedData);
            } catch (err) {
                console.error("Failed to fetch appointment:", err);
                setError("Failed to load appointment.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!appointment) return <div>No appointment found.</div>;

    return (
        <div className='container text-center'>
            <h2>{appointment.Title}</h2>
            <p>Description: {appointment.Description}</p>
            <p>Date: {appointment.Date}</p>
            <p>Time: {appointment.Time}</p>
            <p>Importance: {appointment.LevelOfImportance}</p>
            <p>Address: {appointment.Address}</p>
        </div>
    );
};

export default ViewAppointment;
