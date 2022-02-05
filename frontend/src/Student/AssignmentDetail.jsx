import React from "react";
import './AssignmentDetail.css'

export default function AssignmentDetail(props) {
    function callGetAssignmentSubmit(credentials) {
        // return fetch('http://localhost:8080/classes', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(credentials)
        // })
        // .then(data => data.json())

        return {
            "id": props.assignment.id,
            "status": "Submitted",
            "score": "",
        }
    }
    const assignment = callGetAssignmentSubmit();
    return (
        <>
            <div className="container border p-3">
                <span>
                    <h5 id="assignment-name">{props.assignment.detail}</h5>
                    <div id="due">Due 11 October 2021 10:15<br /></div>
                    <div><b>Instructions</b><br /></div>
                    <div className="detail"><em>{props.assignment.instruction}</em></div>
                </span>
                <form action="http://localhost:5000/students/1/assignments/1/submit" method="post"
                    encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="file">Choose files:</label><br />
                        <input type="file" id="files" name="files[]" multiple accept="image/*" /><br />
                        <div id="selectedFiles"></div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="container border p-3">
                <span>
                    <h5>Grade</h5>
                    <em>Status: </em><b id="status">{assignment.status}</b><br />
                    <em>Scores: </em><b id="score">{assignment.score}</b>
                </span>
                <div>
                    <img src="sample/data/AssignmentDetail/Trần Vũ Tuấn Kiệt/trang_0.jpg" alt="Image 1" height="200" />
                    <img src="sample/data/AssignmentDetail/Trần Vũ Tuấn Kiệt/trang_1.jpg" alt="Image 1" height="200" />
                </div>
            </div>
        </>
    )
}