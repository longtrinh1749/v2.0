import React from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function Sidebar() {
    const classHandler = () => {
        console.log("Class")
    }

    const assignmentHandler = () => {
        console.log("Assignment")
    }

    return (
        <div className="border-end bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light">Homewerck</div>
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/classes" onClick={classHandler}>Classes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/assignments" onClick={assignmentHandler}>Assignments</a>
            </div>
        </div>
    )
}