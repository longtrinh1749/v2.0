import React from "react";
import './AssignmentDetail.css';
import AssignmentStudent from './AssignmentStudent';

function callGetStudents(credentials) {
    // return fetch('http://localhost:8080/classes', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    // .then(data => data.json())

    return [
        {
            "studentId": 1,
            "name": "Ngô Hoàng Bảo Anh",
            "status": "Graded",
            "grade": "9"
        },
        {
            "studentId": 2,
            "name": "Trần Vũ Tuấn Kiệt",
            "status": "Submitted",
            "grade": ""
        },
        {
            "studentId": 3,
            "name": "Trịnh Minh Tuấn",
            "status": "Not yet submitted",
            "grade": ""
        }
    ]
}

export default function AssignmentDetail(props) {
    const students = callGetStudents();
    console.log(props.handleAssignment);
    const listStudents = students.map((student, index) =>
        <AssignmentStudent key={index} index={index} student={student} assignment={props.assignment} handleAssignment={props.handleAssignment} />
    );
    return (
        <>
            {listStudents}
        </>
    )
}