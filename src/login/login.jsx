import React from 'react';
import './login.css';

export function Login() {
    return (
        <main id="front-page">
            <div id="sign-in" className="sign-in basic-box">
                <h1>Path for Eternity</h1>
                <form>
                    <input type="text" id="username" placeholder="Username" />
                    <input type="password" id="password" placeholder="Password" />
                    <input id="sign-in-submit" type="submit" />
                </form>
            </div>
        </main>
    );
}