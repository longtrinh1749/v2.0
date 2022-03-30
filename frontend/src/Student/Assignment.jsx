import React from "react";
import { NavLink } from "react-router-dom";
import './Assignment.css'

export default function Assignment(props) {
    console.log(props);
    const handleAssignmentClick = () => {
        props.handleAssignment(props.assignment);
    }
    return (
        <div className="card">
            <img src="https://cdn.jsdelivr.net/gh/azota889/storage_public/azota_assets/images/u416.svg" id="book"></img>
            <div className="card-body">
                <h5 className="card-title">{props.assignment.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.assignment.detail}</h6>
                <p className="card-text">{props.assignment.instruction}</p>
                {/* <a href="#" className="card-link" onClick={handleAssignmentClick}> */}
                <NavLink className="nav-link" to="/student-assignment" onClick={handleAssignmentClick}>
                    View
                </NavLink>
                {/* </a> */}
            </div>
        </div>
    )
}