import React from "react";
import './Class.css'

export default function Class(props) {

    return (
        <div className="card">
            <img src="https://www.iconbunny.com/icons/media/catalog/product/2/1/2154.8-sitting-in-class-icon-iconbunny.jpg" id="teacher-class"></img>
            <div className="card-body">
                <h5 className="card-title">{props.teacherClass.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.teacherClass.teacher}</h6>
                <p className="card-text">Some quick description of class.</p>
                <a href="/assignments" className="card-link">Assignments</a>
            </div>
        </div>
    )
}