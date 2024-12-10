import { addAppointment, closeModel } from "./Lib";
import { useState } from "react";

export default function New(props: any) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        address: "",
        date: "",
        time: "",
        done: true,
        deleted: false,
        levelOfImportance: 2
    });

    const newAppointment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const updatedValue = type === "number" ? parseInt(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue
        }));

    };

    const postApp = () => {
        props.loader();

        // Format date to ensure it is in ISO format
        const formattedData = {
            ...formData,
            date: new Date(formData.date).toISOString(),
        };

        addAppointment(formattedData)
            .then((response) => {
                console.log("Appointment added:", response);
                props.refreshApp(); // Call to refresh appointment list
            })
            .catch((error) => console.error("Error adding appointment:", error));
            closeModel("new-modal");
    };

    return (
        <div className="modal-container">
            <div className="modal-title">New Appointment</div>

            <div className="mt-15">
                <label htmlFor="Title_n">Title</label><br />
                <input
                    type="text"
                    id="Title_n"
                    name="title"
                    maxLength={150}
                    value={formData.title}
                    onChange={newAppointment}
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
                    onChange={newAppointment}
                ></textarea>
                <span>0/300</span>
            </div>

            <div className="row mt-15">
                <div>
                    <label htmlFor="Address_n">Address</label><br />
                    <input
                        type="text"
                        id="Address_n"
                        name="address"
                        value={formData.address}
                        onChange={newAppointment}
                    />
                </div>

                <div className="ms-10">
                    <label htmlFor="LevelOfImportance_n">Importance</label><br />
                    <select
                        id="LevelOfImportance_n"
                        name="levelOfImportance"
                        value={formData.levelOfImportance}
                        onChange={newAppointment}
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
                    <label htmlFor="Date_n">Date</label><br />
                    <input
                        type="date"
                        id="Date_n"
                        name="date"
                        value={formData.date}
                        onChange={newAppointment}
                    />
                </div>

                <div>
                    <label htmlFor="Time_n">Time</label><br />
                    <input
                        type="time"
                        id="Time_n"
                        name="time"
                        value={formData.time}
                        onChange={newAppointment}
                    />
                </div>
            </div>

            <div className="row justify-btw modal-action-container mt-15">
                <div className="btn" onClick={() => closeModel("new-modal")}>Cancel</div>
                <div className="btn ms-10" onClick={postApp}>Add</div>
            </div>
        </div>
    );
}
