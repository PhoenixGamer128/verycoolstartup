import React from "react";
import './addEvent.css';
import { submitEvent } from "../services";

function calculateDate(dateObject) {
    // Formatted like this for July 1st, 2024: 2024-06-01T12:00:00.000Z
    // Year, month, and day is separated because the month is zero-indexed
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, padding
    const day = String(dateObject.getDate()).padStart(2, '0'); // Padding
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD for date input value
}

function addTime(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins + minutes);
    return date.toTimeString().split(' ')[0].slice(0, 5);
}

function calculateDuration(startTime, endTime) {
    const [startHours, startMins] = startTime.split(':').map(Number);
    const [endHours, endMins] = endTime.split(':').map(Number);
    const startTotalMins = startHours * 60 + startMins;
    const endTotalMins = endHours * 60 + endMins;
    return endTotalMins - startTotalMins;
}

export function AddEvent(props) {

    const duration = 30; // minutes

    const currentDateInfo = new Date(); 
    const currentDate = calculateDate(currentDateInfo);
    const currentTime = currentDateInfo.toTimeString().split(' ')[0].slice(0, 5); // "12:00:00" -> "12:00"
    

    const [eventName, setEventName] = React.useState("");
    const [eventColor, setEventColor] = React.useState("#FFFFFF");
    const [eventDate, setEventDate] = React.useState(currentDate);
    const [startTime, setStartTime] = React.useState(currentTime);
    const [endTime, setEndTime] = React.useState(addTime(currentTime, duration));
    const [location, setLocation] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [availability, setAvailability] = React.useState("Busy");

    function handleSubmit(e) {
            e.preventDefault();
            const eventData = {
                eventName,
                eventColor,
                eventDate,
                startTime,
                endTime,
                duration: calculateDuration(startTime, endTime),
                location,
                description,
                availability
            };
            submitEvent(props.username, eventData);
        }

    return (
        <main>
            <h1>Add event</h1>
            <div id="add-page">
                <div id="add-event" className="basic-box">
                    <form onSubmit={handleSubmit}>
                        <div id="event-name">
                            <input type="text" placeholder="Event Title" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                            <input type="color" value={eventColor} onChange={(e) => setEventColor(e.target.value)} />
                        </div>
                        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                        <div id="time-picker">
                            <div>
                                <label htmlFor="start-time">Start time</label>
                                <input type="time" id="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="end-time">End time</label>
                            <input type="time" id="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                            </div>
                        </div>
                        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <div>
                            <label htmlFor="availability">Availability:</label>
                            <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                                <option value="Busy">Busy</option>
                                <option value="Free">Free</option>
                            </select>
                        </div>
                        <button type="button">Add from Google Calendar API</button>
                        <div><input type="submit" defaultValue="Add Event" /></div>
                    </form>
                </div>
                {/*}
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
                */}
            </div>
        </main>
    );
}