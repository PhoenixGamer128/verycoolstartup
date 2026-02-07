import React from "react";
import './addEvent.css';

export function AddEvent() {
    return (
        <main>
            <h1>Add event</h1>
            <div id="add-page">
                <div id="add-event" className="basic-box">
                    <form>
                        <div id="event-name">
                            <input type="text" placeholder="Event Title" />
                            <input type="color" defaultValue="#FFFFFF" />
                        </div>
                        <input type="date" defaultValue="2026-12-31" />
                        <div id="time-picker">
                            <div>
                                <label htmlFor="start-time">Start time</label>
                                <input type="time" id="start-time" defaultValue="00:00" />
                            </div>
                            <div>
                                <label htmlFor="end-time">End time</label>
                            <input type="time" id="end-time" defaultValue="23:59" />
                            </div>
                        </div>
                        <input type="text" placeholder="Location" />
                        <textarea placeholder="Description"></textarea>
                        <div>
                            <label htmlFor="availability">Availability:</label>
                            <select id="availability">
                                <option defaultValue>Busy</option>
                                <option>Free</option>
                            </select>
                        </div>
                        <button>Add from Google Calendar API</button>
                        <div><input type="submit" defaultValue="Add Event" /></div>
                    </form>
                </div>
                
                <div id="add-task" className="basic-box">
                    <form>
                        <div id="task-name">
                            <input type="text" placeholder="Task name" />
                            <input type="color" defaultValue="#FFFFFF" />
                        </div>
                        <div id="time-picker">
                            <div>
                                <label htmlFor="task-time">Time</label>
                                <input type="time" id="task-time" defaultValue="00:00" />
                            </div>
                        </div>
                        <input type="date" defaultValue="2026-12-31" />
                        <div><input type="submit" defaultValue="Add Task" /></div>
                    </form>
                </div>
            </div>
        </main>
    );
}