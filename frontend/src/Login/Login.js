import React, { useState } from "react";
import PropTypes from 'prop-types';

import './Login.css'

async function loginUser(credentials) {
    // return fetch('http://localhost:8080/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    //     .then(data => data.json())
    return { "token": credentials.username }
}

export default function Login({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        // <div className="login-wrapper">
        //     <h1>Please log in</h1>
        //     <form onSubmit={handleSubmit}>
        //         <label>
        //             <p>Username</p>
        //             <input type="text" onChange={e => setUsername(e.target.value)} />
        //         </label>
        //         <label>
        //             <p>Password</p>
        //             <input type="password" onChange={e => setPassword(e.target.value)} />
        //         </label>
        //         <div>
        //             <button type="submit">Submit</button>
        //         </div>
        //     </form>
        // </div>
        <div class="wrapper fadeInDown">
            <div id="formContent">
                <div class="fadeIn first">
                    <img src="https://t4.ftcdn.net/jpg/01/90/50/61/360_F_190506160_coExNloNdTd1OcvJe3cbdddUDqoqiJ2B.jpg" id="icon" alt="User Icon" />
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="login" class="fadeIn second" name="login" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                    <input type="password" id="password" class="fadeIn third" name="login" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <input type="submit" class="fadeIn fourth" value="Log In" />
                </form>
                <div id="formFooter">
                    <a class="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}