import React from "react";
import { NavLink } from "react-router-dom";

export default function Assignment(props) {
    console.log(props);
    const handleAssignmentClick = () => {
        props.handleAssignment(props.assignment);
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.assignment.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.assignment.detail}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Finish: {props.assignment.finish}/{props.assignment.total}</h6>
                <p className="card-text">{props.assignment.instruction}</p>
                {/* <a href="#" className="card-link" onClick={handleAssignmentClick}> */}
                <NavLink className="nav-link" to="/teacher-assignment">
                    View
                </NavLink>
                {/* </a> */}
            </div>
        </div>
    )
}