import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useToken from "../App/useToken";
import useRole from "../hooks/useRole";
import StudentClass from '../Student/Class';
import TeacherClass from '../Teacher/Class';

function callGetClasses(credentials) {
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
                "name": "Math 3",
                "teacher": "Nguyen Van A",
                "school": "TH Truong Dinh"
            },
            {
                "name": "Math 2",
                "teacher": "Nguyen Van A",
                "school": "TH Thinh Liet"
            },
            {
                "name": "Math 2B",
                "teacher": "Nguyen Van A",
                "school": "TH Truong Dinh"
            },
            {
                "name": "Literature",
                "teacher": "Nguyen Phuong D",
                "school": "TH Thinh Liet"
            }
        ]
    } else if (credentials.role == "ROLE.TEACHER") {
        return [
            {
                "name": "Math 3",
                "teacher": "Nguyen Van A",
                "school": "TH Truong Dinh"
            },
            {
                "name": "Math 2",
                "teacher": "Nguyen Van A",
                "school": "TH Thinh Liet"
            },
            {
                "name": "Math 2B",
                "teacher": "Nguyen Van A",
                "school": "TH Truong Dinh"
            },
        ]
    }
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

    const newClasses = callGetClasses({ role });
    console.log(newClasses);


    if (!role) {
        return (
            <h1>Role not specified</h1>
        )
    } else if (role == "ROLE.STUDENT") {
        const listStudentClasses = newClasses.map((studentClass, index) =>
            <StudentClass key={index} index={index} studentClass={studentClass} />
        );
        return (
            <>
                {listStudentClasses}
            </>
        )
    } else if (role == "ROLE.TEACHER") {
        const listTeacherClasses = newClasses.map((teacherClass, index) =>
            <TeacherClass key={index} index={index} teacherClass={teacherClass} />
        );
        return (
            <>
                {listTeacherClasses}
            </>
        )
    }
}