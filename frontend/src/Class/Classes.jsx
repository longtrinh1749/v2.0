import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useToken from "../App/useToken";
import useRole from "../hooks/useRole";
import StudentClass from '../Student/Class';

function callGetClasses(credentials) {
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
            "name": "Math 3",
            "teacher": "Nguyen Van A",
            "school": "TH Truong Dinh"
        },
        {
            "name": "Math 2",
            "teacher": "Pham Thi B",
            "school": "TH Thinh Liet"
        },
        {
            "name": "Math 2B",
            "teacher": "Trinh Thi C",
            "school": "TH Truong Dinh"
        },
        {
            "name": "Literature",
            "teacher": "Nguyen Phuong D",
            "school": "TH Thinh Liet"
        }
    ]
}

export default function Classes() {
    const { role, setRole } = useRole();
    const [classes, setClasses] = useState([]);
    const { token, setToken } = useToken();

    // useEffect(() => {
    //     let params = {
    //         role: role,
    //         token: token
    //     }
    //     let res = getClasses(params);
    //     console.log(res);
    //     if (res) setClasses(res)
    //     else setClasses([])
    // })

    const newClasses = callGetClasses();
    console.log(newClasses);


    if (!role) {
        return (
            <h1>Role not specified</h1>
        )
    } else if (role == "ROLE.STUDENT") {
        const listStudentClasses = newClasses.map((studentClass, index) =>
            <StudentClass index={index} studentClass={studentClass} />
        );
        return (
            <>
                {listStudentClasses}
            </>
        )
    } else if (role == "ROLE.TEACHER") {
        return (
            <h1>Teacher classes</h1>
        )
    }
}