import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Student from '../Student/Student'
import Teacher from '../Teacher/Teacher'
import Classes from '../Class/Classes';
import Assignments from '../Assignment/Assignments';
import AssignmentDetail from '../Student/AssignmentDetail';
import Navigation from './Navigation/Navigation';
import Sidebar from './Sidebar/Sidebar';
import useToken from './useToken';

function App() {
    const { token, setToken } = useToken();
    const [assignment, setAssignment] = useState();
    const handleAssignment = (id) => {
        setAssignment(id);
    }

    if (!token) {
        return <Login setToken={setToken} />
    }

    console.log("assignment id:" + assignment);

    return (
        <>
            <Sidebar />
            <div id="page-content-wrapper">
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/student" exact element={<Student />} />
                        <Route path="/teacher" exact element={<Teacher />} />
                        <Route path="/classes" exact element={<Classes />} />
                        <Route path="/assignments" exact element={<Assignments handleAssignment={handleAssignment} />} />
                        <Route path="/assignment" exact element={<AssignmentDetail assignment={assignment} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
