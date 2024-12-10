import { Link } from "react-router-dom";
import { activeId, entry, openModal } from "./Lib";

export default function Appointment(props: any) {
  const handleDeleteClick = (id: any) => {
    activeId.id = id;
    props.stateListener(Math.random() * 100 * Math.random());
    // Open delete modal
    openModal("delete-modal");
  };

  const handleEdit = (row: any) => {
    activeId.id = row.id;
    Object.assign(entry, row);
    // Update state
    props.stateListener(Math.random() * 100 * Math.random());
    // Open edit modal
    openModal("edit-modal");
  };

  return (
    <tr
      className={`${
        props.item.deleted
          ? "table-danger"
          : props.item.done
          ? "table-success"
          : ""
      }`}
    >
      <td>{props.item.id}</td>
      <td>{props.item.title}</td>
      <td>{props.item.description}</td>
      <td
        className={`${
          props.item.levelOfImportance === 0
            ? "bg-success text-white"
            : props.item.levelOfImportance === 4
            ? "bg-warning"
            : props.item.levelOfImportance === 5
            ? "bg-danger text-white"
            : ""
        }`}
      >
        {props.item.levelOfImportance}
      </td>
      <td>{props.item.date}</td>
      <td>{props.item.time}</td>
      <td>{props.item.address}</td>

      <td>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handleEdit(props.item)}
        >
          ✏️
        </button>
      

        <button
          className={`btn btn-outline-danger btn-sm ${
            props.item.deleted ? "disabled" : ""
          }`}
          onClick={() => !props.item.deleted && handleDeleteClick(props.item.id)}
          disabled={props.item.deleted}
        >
          ❌
        </button>

        <Link
          className="btn btn-outline-secondary btn-sm"
          to={`/appointments/view/${props.item.id}`}
        >
          👁
        </Link>
      </td>

    </tr>
  );
}
