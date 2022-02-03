import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Student from '../Student/Student'
import Teacher from '../Teacher/Teacher'
import Navigation from './Navigation/Navigation';
import Sidebar from './Sidebar/Sidebar';
import useToken from './useToken';

function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <>
            <Sidebar />
            <div id="page-content-wrapper">
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/student" exact element={<Student />} />
                        <Route path="/teacher" exact element={<Teacher />} />
                        {/* <Route path="/student/classes" exact element={<StudentClasses />} */}
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
