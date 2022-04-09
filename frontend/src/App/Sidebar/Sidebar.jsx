import React from "react";
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function Sidebar() {
    const classHandler = () => {
        console.log("Class")
    }

    const assignmentHandler = () => {
        console.log("Assignment")
    }

    return (
        <div className="border-end bg-white" id="sidebar-wrapper" style={{width:280}}>
            <div className="sidebar-heading border-bottom bg-light">Homewerk</div>
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/courses/courses" onClick={classHandler}>Your courses</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/courses/create" onClick={classHandler}>Create course</a>
            </div>
            {/* <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                        Course
                    </button>
                    <div className="collapse" id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="/courses/courses" className="link-dark rounded">Your courses</a></li>
                            <li><a href="/courses/create" className="link-dark rounded">Create course</a></li>
                        </ul>
                    </div>
                </li>
            </ul> */}

        </div>
    )
}