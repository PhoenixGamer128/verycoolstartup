import React from "react";

export function AddEvent() {
    return (
        <main>
            <h1>Add event</h1>
            <div id="add-page">
                <div id="add-event" class="basic-box">
                    <form>
                        <div id="event-name">
                            <input type="text" placeholder="Event Title" />
                            <input type="color" value="#FFFFFF" />
                        </div>
                        <input type="date" value="2026-12-31" />
                        <div id="time-picker">
                            <div>
                                <label for="start-time">Start time</label>
                                <input type="time" id="start-time" value="00:00" />
                            </div>
                            <div>
                                <label for="end-time">End time</label>
                            <input type="time" id="end-time" value="23:59" />
                            </div>
                        </div>
                        <input type="text" placeholder="Location" />
                        <textarea placeholder="Description"></textarea>
                        <div>
                            <label for="availability">Availability:</label>
                            <select id="availability">
                                <option selected>Busy</option>
                                <option>Free</option>
                            </select>
                        </div>
                        <button>Add from Google Calendar API</button>
                        <div><input type="submit" value="Add Event" /></div>
                    </form>
                </div>
                
                <div id="add-task" class="basic-box">
                    <form>
                        <div id="task-name">
                            <input type="text" placeholder="Task name" />
                            <input type="color" value="#FFFFFF" />
                        </div>
                        <div id="time-picker">
                            <div>
                                <label for="task-time">Time</label>
                                <input type="time" id="task-time" value="00:00" />
                            </div>
                        </div>
                        <input type="date" value="2026-12-31" />
                        <div><input type="submit" value="Add Task" /></div>
                    </form>
                </div>
            </div>
        </main>
    );
}