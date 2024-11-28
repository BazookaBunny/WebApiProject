import { useEffect } from "react";
import { activeId, closeModel, deleteAppointment } from "./Lib";


export default function Delete(props: any) { 

    useEffect(() => {

    }, [props.stateListener])

    const deleteApp = async () => {
        await deleteAppointment(activeId.id)
            .then((response) => {
                console.log("Appointment deleted");
                props.refreshApp(Math.random() * 100 * Math.random());
            })
            .catch((error) => console.error("Error adding appointment:", error));
        closeModel("delete-modal"); 
    };

    return (
        <div className="modal-container">
            <div className="modal-title">Delete Appointment</div>
            <div className="row justify-btw modal-action-container mt-15">
                <div className="btn" onClick={deleteApp}>Yes</div>
                <div className="btn" onClick={() => closeModel("delete-modal")}>No</div>
            </div>
        </div>
    );
}
