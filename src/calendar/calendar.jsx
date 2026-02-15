import React from "react";
import './calendar.css';
import { RenderEvents } from "./eventDisplay";

export function Calendar(props) {



    return (
        <main id="calendar-page">
            <div id="calendar-main">
                <div id="calendar-title">
                    <h1>Calendar</h1>
                    <button className="basic-box">Tasks</button>
                </div>
                <div id="event-block">
                    <RenderEvents username={props.username} />
                </div>
            </div>
            <div id="taskbar" className="basic-box">
                <p>Tasks</p>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                </ul>
            </div>
        </main>
    )
}