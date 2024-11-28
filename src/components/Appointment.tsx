import { Link } from "react-router-dom";
import { activeId, entry, openModal } from "./Lib";

export default function Appointment(props: any){

    const handleDeleteClick = (id: any) => {
        activeId.id = id;
        props.stateListener(Math.random() * 100 * Math.random())
        //open modal
        openModal("delete-modal")
    };

    const handleEdit = (row: any) => {
        activeId.id = row.id;
        Object.assign(entry, row)
        //update state
        props.stateListener(Math.random() * 100 * Math.random())
        //open modal
        openModal("edit-modal")
    };

    return (
        <div className={`row underline ${props.item.deleted ? 'bc-red' : props.item.done ? 'bc-green' : '' } `} key={props.item.id}>
            <div className="column id">
               {props.item.id}
            </div>
            <div className="column title">{props.item.title}</div>
            <div className="column description">{props.item.description}</div>
            <div className={`column importance ${ props.item.levelOfImportance === 0 ? 'bc-green' :
                props.item.levelOfImportance === 4 ? 'bc-gold' : props.item.levelOfImportance === 5 ? 'bc-red' : ''
             } `}>{props.item.levelOfImportance}</div>
            <div className="column date">{props.item.date}</div>
            <div className="column time">{props.item.time}</div>
            <div className="column address">{props.item.address}</div>

            <div className="column edit">
                <div className="btn edit" onClick={() => handleEdit(props.item)}>Edit</div>
            </div>

            <div className={`column delete ${ props.item.deleted ? 'not-allowed' : ' ' } `}>
                <div className={`btn delete ${ props.item.deleted ? 'no-event' : ' ' } `} onClick={() => handleDeleteClick(props.item.id)}>Delete</div>
            </div>

            <div className="column view">
                <Link className="btn-view" to={`/appointments/view/${props.item.id}`}>View</Link>
            </div>

        </div>
    );
}