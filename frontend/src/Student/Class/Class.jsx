import React from "react";
import './Class.css'
export default function Class(props) {

    return (
        <div className="card">
            <img src="https://www.iconbunny.com/icons/media/catalog/product/2/1/2154.8-sitting-in-class-icon-iconbunny.jpg" id="class-student"></img>
            <div className="card-body">
                {/* <img src="https://cdn.jsdelivr.net/gh/azota889/storage_public/azota_assets/images/u416.svg"></img> */}
                <h5 className="card-title">{props.studentClass.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.studentClass.teacher}</h6>
                <p className="card-text">Some quick description of class.</p>
                <a href="/assignments" className="card-link">Assignments</a>
            </div>
            {/* <div class="row">
                <div class="col-sm">
                    One of three columns
                </div>
                <div class="col-sm">
                    One of three columns
                </div>
                <div class="col-sm">
                    One of three columns
                </div>
            </div> */}
        </div>
    )
}