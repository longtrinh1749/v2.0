import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        // <div className="navigation" >
        //     <nav className="navbar navbar-expand navbar-dark bg-dark">
        //         <div className="container">
        //             <NavLink className="navbar-brand" to="/">
        //                 Homewreck
        //             </NavLink>
        //             <div>
        //                 <ul className="navbar-nav m1-auto">
        //                     <li className="nav-item">
        //                         <NavLink className="nav-link" to="/">
        //                             Home
        //                         </NavLink>
        //                     </li>
        //                     <li className="nav-item">
        //                         <NavLink className="nav-link" to="/student">
        //                             Student
        //                         </NavLink>
        //                     </li>
        //                     <li className="nav-item">
        //                         <NavLink className="nav-link" to="/teacher">
        //                             Teacher
        //                         </NavLink>
        //                     </li>
        //                     <li className="nav-item">
        //                         <NavLink className="nav-link" to="/logout">
        //                             Logout
        //                         </NavLink>
        //                     </li>
        //                     <li className="nav-item">
        //                         <NavLink className="nav-link" to="/logout">
        //                             <div class="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt="" /> </div>
        //                         </NavLink>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        // </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <button className="btn btn-primary" id="sidebarToggle">Menu</button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item"><a className="nav-link" href="#!">Home</a></li>
                        <li className="nav-item active"><a className="nav-link" href="/student">Student</a></li>
                        <li className="nav-item"><a className="nav-link" href="/teacher">Teacher</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#!">Profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#!">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;