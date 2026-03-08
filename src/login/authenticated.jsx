import React from 'react';
import './login.css';
import { AuthState } from './authState';



export function Authenticated(props) {
    async function LogoutUser(e) {
            fetch('/api/auth/logout', {
                method: 'delete',
            }).catch(err => console.error('Logout failed', err))
            .finally(() => {
                localStorage.removeItem('username');
                props.onAuthChange(username, AuthState.Unauthenticated);
            }
            );
        };
        
    const onAuthChange = props.onAuthChange;
    const username = props.username;
    return (
        <div>
            <p>Welcome, {props.username}!</p>
            <input id="log-out" type="button" onClick={LogoutUser} value="Log out" />
        </div>
    )}