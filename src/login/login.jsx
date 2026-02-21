import React from 'react';
import './login.css';
import { LoginUser, CreateUser } from '../services';

export function Login({ setUser }) {
    function Login(e) {
        e.preventDefault();
        LoginUser(username, password) && setAuthenticated(true);
        setUser(username);
    }

    function Register(e) {
        e.preventDefault();
        CreateUser(username, password);
    }

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [authenticated, setAuthenticated] = React.useState(false);

    return (
        <main id="front-page">
            <div id="sign-in" className="sign-in basic-box">
                <h1>Path for Eternity</h1>
                <form onSubmit={Register}>
                    <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div id="sign-in-options">
                        <input id="log-in" type="button" onClick={Login} value="Log in" />
                        <input id="sign-up" type="submit" value="Sign up" />
                    </div>
                </form>
                <p>{authenticated ? `Welcome, ${username}!` : ""}</p>
            </div>
        </main>
    );
}