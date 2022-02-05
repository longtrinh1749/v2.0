import React from "react";
import { NavLink } from "react-router-dom";

export default function AssignmentStudent(props) {

    const handleAssignmentClick = () => {
        props.handleAssignment(props.assignment);
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.student.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Status: {props.student.status}</h6>
                {
                    props.student.grade &&
                    <div>Grade: {props.student.grade}</div>
                }
                {
                    props.student.status != "Not yet submitted" &&
                    <NavLink className="nav-link" to="/assignment" onClick={handleAssignmentClick}>View Submitted</NavLink>
                }
            </div>
        </div >
    )
}