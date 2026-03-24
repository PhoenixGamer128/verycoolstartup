import React from 'react';
import './login.css';
//import { LoginUser, CreateUser } from '../services';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';

export function Login(props) {
    

    const [username, setUsername] = React.useState(props.username || "");
    const [password, setPassword] = React.useState("");
    // const [authenticated, setAuthenticated] = React.useState(false);

    return (
        <main id="front-page">
            <div id="sign-in" className="sign-in basic-box">
                <h1>Path for <span id="eternity">Eternity</span></h1>
                <form>
                    
                    <div id="sign-in-options">
                        {/* {props.authState === AuthState.Unauthenticated && (
                            <input id="log-in" type="button" onClick={LoginUser} value="Log in" />
                        )}
                        {props.authState === AuthState.Unauthenticated && (
                            <input id="register" type="button" onClick={RegisterUser} value="Register" />
                        )} */}
                        {props.authState === AuthState.Unauthenticated && (
                            <Unauthenticated onAuthChange={props.onAuthChange} username={username} setUsername={setUsername} setPassword={setPassword} password={password} />
                        )}
                        {/* {props.authState === AuthState.Authenticated && (
                            <input id="log-out" type="button" onClick={LogoutUser} value="Log out" />
                        )} */}
                        {props.authState === AuthState.Authenticated && (
                            <Authenticated onAuthChange={props.onAuthChange} username={username} />
                        )}
                    </div>
                </form>
                <p>{props.authenticated ? `Welcome, ${username}!` : ""}</p>
            </div>
        </main>
    );
}