import React from 'react';
import './login.css';
import { LoginUser, CreateUser } from '../services';
import { AuthState } from './authState';

export function Login(props) {
    async function LoginUser(e) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (response?.status === 200) {
            localStorage.setItem('username', username);
            props.onAuthChange(username, AuthState.Authenticated);
        } else {
            const body = await response?.json();
            alert('Login failed: ' + (body?.message || 'Unknown error'));
        }
        // e.preventDefault();
        // LoginUser(username, password) && setAuthenticated(true);
        // setUser(username);
    }

    async function RegisterUser(e) {
        const response = await fetch('/api/auth/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (response?.status === 200) {
            setUserCreated(true);
            props.onAuthChange(username, AuthState.Authenticated);
        } else {
            const body = await response?.json();
            alert('Registration failed: ' + (body?.message || 'Unknown error'));
        }
        // e.preventDefault();
        // CreateUser(username, password) && setUserCreated(true);
    }

    async function LogoutUser(e) {
        fetch('/api/auth/logout', {
            method: 'delete',
        }).catch(err => console.error('Logout failed', err))
        .finally(() => {
            localStorage.removeItem('username');
            props.onAuthChange(username, AuthState.Unauthenticated);
        });
        // e.preventDefault();
        // setAuthenticated(false);
        // setUser("");
    }

    const [username, setUsername] = React.useState(props.username || "");
    const [password, setPassword] = React.useState("");
    const [authenticated, setAuthenticated] = React.useState(false);
    const [userCreated, setUserCreated] = React.useState(false);

    return (
        <main id="front-page">
            <div id="sign-in" className="sign-in basic-box">
                <h1>Path for Eternity</h1>
                <form>
                    <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div id="sign-in-options">
                        {props.authState === AuthState.Unauthenticated && (
                            <input id="log-in" type="button" onClick={LoginUser} value="Log in" />
                        )}
                        {props.authState === AuthState.Unauthenticated && (
                            <input id="register" type="button" onClick={RegisterUser} value="Register" />
                        )}
                        {props.authState === AuthState.Authenticated && (
                            <input id="log-out" type="button" onClick={LogoutUser} value="Log out" />
                        )}
                    </div>
                </form>
                <p>{props.authenticated ? `Welcome, ${username}!` : ""}</p>
                <p>{props.userCreated ? `Account ${username} created successfully!` : ""}</p>
            </div>
        </main>
    );
}