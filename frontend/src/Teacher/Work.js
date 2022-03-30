import React from "react";
import './Work.css';

function callGetWork(credentials) {
    // return fetch('http://localhost:8080/classes', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    // .then(data => data.json())
    return {
        "studentName": "Trần Vũ Tuấn Kiệt",
        "class": "Math 2",
        "school": "TH Thịnh Liệt",
        "status": "Graded",
        "grade": "9",
        "works": [
            "sample/data/AssignmentDetail/Trần Vũ Tuấn Kiệt/trang_0.jpg",
            "sample/data/AssignmentDetail/Trần Vũ Tuấn Kiệt/trang_1.jpg"
        ]
    }
}

export default function Work(props) {
    const work = callGetWork()
    console.log("asd" + props.assignment.id);
    return (
        <div className="container-fluid" id="word-wrapper">
            <div className="row">
                <div className="col-sm sticky" id="grading-tool-section">
                    <div class="sticky">
                        I am sticky!
                        <button className="grading-tool" id="tool-pen">Pen</button>
                        <button className="grading-tool" id="tool-symbol">Symbol</button>
                        <button className="grading-tool" id="tool-comment">Comment</button>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="img-layer layer" id="img-layer">
                        <img id="work-img" src={work.works[0]} />
                        <img id="work-img" src={work.works[1]} />
                    </div>
                    {/* <div className="drawing-layer" id="drawing-layer" onClick={ }></div> */}
                    <div className="drawing-layer layer" id="drawing-layer">
                        <canvas id="my-canvas" className="my-canvas" />
                    </div>
                    <div className="object-layer layer" id="object-layer">asd</div>
                    {/* <canvas id='my-canvas'></canvas> */}
                </div>
                <div className="col-sm" id="grading-comment-section">
                    Comment Section
                </div>
            </div>
        </div>
    )
}