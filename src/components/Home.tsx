import { useState, useEffect } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import New from "./New";
import Appointment from "./Appointment";
import { getAppointments, openModal } from "./Lib";
import { DataItem } from "./DataItem";

export default function Home() {
    const [dataList, setDataList] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshData, setRefreshData] = useState(0);
    const [stateListener, setStateListener] = useState(0);


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointments();
                setDataList(data);
            } catch (err) {
                console.error("Failed to fetch appointments:", err);
                setError("Failed to load appointments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [refreshData]); 


    return (
        <div>

            <h1>Manage Your Appointments</h1>
            <p>This web app helps you to manage your dates very easily.</p>
            <div className="add-btn row items-center content-center" onClick={() => openModal("new-modal")}>
                <div className="btn add">+</div>
            </div>

            <div className="row underline hdr">
                <div className="column id">Id</div> 
                <div className="column title">Title</div>
                <div className="column description">Description</div>
                <div className="column importance">Importance</div>
                <div className="column date">Date</div>
                <div className="column time">Time</div>
                <div className="column address">Address</div>
                <div className="column edit">Edit</div>
                <div className="column delete">Delete</div>
                <div className="column view">View</div>
            </div>

            {
                loading ? 
                <div className="row mt-15 waiting">Loading <div className="loading">...</div></div>
                : dataList.map(item => (
                    <Appointment 
                        item={item} 
                        stateListener={setStateListener}
                    />
                ))
            }

            <section>
                <section className="modal new-modal hidden">
                    <New refreshApp={setRefreshData} />
                </section>
                <section className="modal edit-modal hidden">
                    <Edit stateListener={stateListener} refreshApp={setRefreshData}/>
                </section>
                <section className="modal delete-modal hidden">
                    <Delete stateListener={stateListener} refreshApp={setRefreshData}/>
                </section>
            </section>
        </div>
    );
}
