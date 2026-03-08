import React from 'react';
import './login.css';
import { AuthState } from './authState';



export function Unauthenticated(props) {
    const onAuthChange = props.onAuthChange;
    const username = props.username;
    const setUsername = props.setUsername;
    const password = props.password;
    const setPassword = props.setPassword;
    // const setUserCreated = props.setUserCreated;
    
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
            props.onAuthChange(username, AuthState.Authenticated);
        } else {
            const body = await response?.json();
            alert('Registration failed: ' + (body?.message || 'Unknown error'));
        }
        // e.preventDefault();
        // CreateUser(username, password) && setUserCreated(true);
    }
    return (
        <div>
            <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div id="sign-in-options">
                <input id="log-in" type="button" onClick={LoginUser} value="Log in" />
                <input id="register" type="button" onClick={RegisterUser} value="Register" />
            </div>
        </div>
    );
}