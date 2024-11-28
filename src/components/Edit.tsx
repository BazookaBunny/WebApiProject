import { useEffect, useState } from "react";
import { activeId, addAppointment, closeModel, entry, updateAppointment } from "./Lib";

export default function Edit(props: any){

    const [formData, setFormData] = useState({
        id: activeId.id,
        title: entry.title,
        description: entry.description,
        address: entry.address,
        date: entry.date ? entry.date.split('T')[0] : "",
        time: entry.time,
        done: entry.done,
        deleted: entry.deleted,
        levelOfImportance: entry.levelOfImportance
    });

    useEffect(() => {
        // Update formData whenever entry changes (e.g., when an edit is initiated)
        setFormData({
            id: activeId.id,
            title: entry.title,
            description: entry.description,
            address: entry.address,
            date: entry.date ? entry.date.split('T')[0] : "",
            time: entry.time,
            done: entry.done,
            deleted: entry.deleted,
            levelOfImportance: entry.levelOfImportance
        });
    }, [props.stateListener]); // re-run effect when stateListener updates

    const updateEntry = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const updatedValue = type === "number" ? parseInt(value) : value;

        // Update formData state to reflect changes in the form
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: updatedValue
        }));
    };

    const updateApp = () => {

        updateAppointment(formData)
            .then(() => {
                console.log("Appointment updated");
                props.refreshApp(Math.random() * 100 * Math.random());
            })
            .catch((error) => console.error("Error updating appointment:", error));

        closeModel("edit-modal");
    };

    return (
        <div className="modal-container">
            <div className="modal-title">Edit Appointment</div>

            <div className="mt-15">
                <label htmlFor="Title_n">Title</label><br />
                <input
                    type="text"
                    id="Title_n"
                    name="title"
                    maxLength={150}
                    value={formData.title}
                    onChange={updateEntry}
                />
                <span>0/150</span>
            </div>

            <div className="mt-15">
                <label htmlFor="Description_n">Description</label><br />
                <textarea
                    id="Description_n"
                    name="description"
                    maxLength={300}
                    value={formData.description}
                    onChange={updateEntry}
                ></textarea>
                <span>0/300</span>
            </div>

            <div className="row mt-15">
                <div>
                    <label htmlFor="Address_n">Address</label>
                    <input
                        type="text"
                        id="Address_n"
                        name="address"
                        value={formData.address}
                        onChange={updateEntry}
                    />
                </div>

                <div className="ms-10">
                    <label htmlFor="LevelOfImportance_n">Importance</label>
                    <select
                        id="LevelOfImportance_n"
                        name="levelOfImportance"
                        value={formData.levelOfImportance}
                        onChange={updateEntry}
                    >
                        <option value={5}>Very High</option>
                        <option value={4}>High</option>
                        <option value={3}>Medium</option>
                        <option value={2}>Normal</option>
                        <option value={1}>Low</option>
                        <option value={0}>Very Low</option>
                    </select>
                </div>
            </div>

            <div className="row mt-15">
                <div>
                    <label htmlFor="Date_n">Date</label>
                    <input
                        type="date"
                        id="Date_n"
                        name="date"
                        value={formData.date}
                        onChange={updateEntry}
                    />
                </div>

                <div>
                    <label htmlFor="Time_n">Time</label>
                    <input
                        type="time"
                        id="Time_n"
                        name="time"
                        value={formData.time}
                        onChange={updateEntry}
                    />
                </div>
            </div>

            <div className="row justify-btw modal-action-container mt-15">
                <div className="btn" onClick={() => closeModel("edit-modal")}>Cancel</div>
                <div className="btn ms-10" onClick={updateApp}>Edit</div>
            </div>
        </div>
    );
}
