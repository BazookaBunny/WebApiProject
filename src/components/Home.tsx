import { useState, useEffect } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import New from "./New";
import Appointment from "./Appointment";
import { getAppointments, openModal } from "./Lib";
import { DataItem } from "./DataItem";

export default function Home() {
    const [dataList, setDataList] = useState<DataItem[]>([]); // Stores appointment data
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const [refreshData, setRefreshData] = useState(0); // State to trigger data refresh
    const [stateListener, setStateListener] = useState(0); // Used for modal communication

    // Fetch appointments whenever refreshData changes
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true); // Set loader to true before fetching data
            try {
                const data = await getAppointments();
                console.log("Fetched appointments:", data); // Debugging fetched data
                setDataList(data); // Populate the data list
                setError(null); // Clear any previous error
            } catch (err) {
                console.error("Failed to fetch appointments:", err);
                setError("Failed to load appointments."); // Set error message
            } finally {
                setLoading(false); // Loader off after fetching
            }
        };

        fetchAppointments();
    }, [refreshData]); // Dependency: re-fetch when refreshData changes

    // Function to trigger a data refresh
    const refreshApp = () => setRefreshData((prev) => prev + 1);

    return (
        <div className="container my-4">
            {/* Header */}
            <div className="text-center mb-4">
                <h1>Manage Your Appointments</h1>
                <p>This web app helps you to manage your appointments very easily.</p>
            </div>

            {/* Add Button */}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-success"
                    onClick={() => openModal("new-modal")}
                >
                    +
                </button>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Importance</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loading State */}
                        {loading ? (
                                <td colSpan={8} className="text-center">
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>{" "}
                                    Loading...
                                </td>
                        ) : error ? (
                            // Error State
                            <tr>
                                <td colSpan={8} className="text-center text-danger">
                                    {error}
                                </td>
                            </tr>
                        ) : dataList.length === 0 ? (
                            // Empty State
                            <tr>
                                <td colSpan={8} className="text-center">
                                    No appointments found.
                                </td>
                            </tr>
                        ) : (
                            // Render Appointments
                            dataList.map((item) => (
                                <Appointment
                                    key={item.ID}
                                    item={item}
                                    stateListener={setStateListener}
                                    refreshData={refreshApp}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <section>
                <section className="modal new-modal hidden">
                    <New refreshApp={refreshApp} loader={() => setLoading(true)} />
                </section>
                <section className="modal edit-modal hidden">
                    <Edit stateListener={stateListener} refreshApp={refreshApp} />
                </section>
                <section className="modal delete-modal hidden">
                    <Delete stateListener={stateListener} refreshApp={refreshApp} />
                </section>
            </section>
        </div>
    );
}
