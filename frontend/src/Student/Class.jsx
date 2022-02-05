import React from "react";

export default function Class(props) {

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.studentClass.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.studentClass.teacher}</h6>
                <p className="card-text">Some quick description of class.</p>
                <a href="/assignments" className="card-link">Assignments</a>
            </div>
        </div>
    )
}