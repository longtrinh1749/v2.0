import React from "react";
import useRole from "../../hooks/useRole";
import setRole from '../../hooks/useRole';

function Navigation() {
    const { role, setRole } = useRole();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <button className="btn btn-primary" id="sidebarToggle">Menu</button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item"><a className="nav-link" href="#!">Home</a></li>
                        <li className="nav-item active"><a className="nav-link" href="#" onClick={() => setRole("ROLE.STUDENT")}>Student</a></li>
                        <li className="nav-item"><a className="nav-link" href="#" onClick={() => setRole("ROLE.TEACHER")}>Teacher</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account</a>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#!">Profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#!">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navigation;