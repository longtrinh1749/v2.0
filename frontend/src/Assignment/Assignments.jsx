import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useToken from "../App/useToken";
import useRole from "../hooks/useRole";
import StudentAssignment from "../Student/Assignment";
import TeacherAssignment from "../Teacher/Assignment";

function callGetAssignments(credentials) {
    // return fetch('http://localhost:8080/classes', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    // .then(data => data.json())
    if (credentials.role == "ROLE.STUDENT") {
        return [
            {
                "id": 1,
                "name": "Multiplication",
                "detail": "Intro to multiplication",
                "class": "Math 2",
                "instruction": "Do home work number 1, page 35"
            },
            {
                "id": 2,
                "name": "5 - 3",
                "detail": "Subtraction of 5 to 3",
                "class": "Math 2",
                "instruction": "Do home work number 2, page 35"
            },
            {
                "id": 3,
                "name": "4 + 6",
                "detail": "Addition of 4 and 6",
                "class": "Math 2",
                "instruction": "Do home work number 3, page 35"
            },
            // {
            //     "name": "Lượm poem",
            //     "detail": "Lượm poem by Tố Hữu",
            //     "class": "Literature",
            //     "instruction": "Do home work number 4, page 35"
            // }
        ]
    } else if (credentials.role == "ROLE.TEACHER") {
        return [
            {
                "id": 1,
                "name": "Multiplication",
                "detail": "Intro to multiplication",
                "class": "Math 2",
                "finish": 40,
                "total": 50,
                "instruction": "Do home work number 1, page 35"
            },
            {
                "id": 2,
                "name": "5 - 3",
                "detail": "Subtraction of 5 to 3",
                "class": "Math 2",
                "finish": 10,
                "total": 50,
                "instruction": "Do home work number 2, page 35"
            },
            {
                "id": 3,
                "name": "4 + 6",
                "detail": "Addition of 4 and 6",
                "class": "Math 2",
                "finish": 50,
                "total": 50,
                "instruction": "Do home work number 3, page 35"
            },
        ]
    }
}

export default function Assignments({ handleAssignment }) {
    const { role, setRole } = useRole();
    const [assignments, setAssignments] = useState([]);
    const { token, setToken } = useToken();

    // useEffect(() => {
    //     let params = {
    //         role: role,
    //         token: token
    //     }
    //     let res = callGetAssignments(params);
    //     console.log(res);
    //     if (res) setClasses(res)
    //     else setClasses([])
    // })

    // const handleAssignment = (id) => {
    //     console.log(id);
    //     props.setAssignment(id);
    // }

    const newAssignments = callGetAssignments({ role });

    if (!role) {
        return (
            <h1>Role not specified</h1>
        )
    } else if (role == "ROLE.STUDENT") {
        console.log("asd");
        const listStudentAssignments = newAssignments.map((assignment, index) =>
            <StudentAssignment key={index} index={index} assignment={assignment} handleAssignment={handleAssignment} />
        );
        return (
            <>
                <h1>Class: {newAssignments[0].class}</h1>
                {listStudentAssignments}
            </>
        )
    } else if (role == "ROLE.TEACHER") {
        const listTeacherAssignments = newAssignments.map((assignment, index) =>
            <TeacherAssignment key={index} index={index} assignment={assignment} handleAssignment={handleAssignment} />
        );
        return (
            <>
                <h1>Class: {newAssignments[0].class}</h1>
                {listTeacherAssignments}
            </>
        )
    }
}