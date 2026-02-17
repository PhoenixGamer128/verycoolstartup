import React from "react";
import { GetEvents } from "./services";

function eventStyle(event, column, numColumns) {
    const startTimeMins = parseInt(event.startTime.split(':')[0]) * 60 + parseInt(event.startTime.split(':')[1]);
    return {
        position: "absolute",
        width: `${100 / numColumns}%`, // Adjust width based on number of columns
        backgroundColor: event.eventColor,
        height: `${event.duration/60/24*100}%`, // Convert duration from minutes to fraction of a day, then to percentage
        top: `${startTimeMins/60/24*100}%`, // Convert start time from minutes to fraction of a day, then to percentage
        left: `${column * 100 / numColumns}%`, // Position based on column (0 or 1)
    }
}

export function RenderEvents(props) {
    const events = GetEvents(props.username);
    const numColumns = props.numColumns || 1; // Default to 1 column if not provided
    const columnID = props.columnID || 0; // Default to 0 if not provided
    return (
        <div id="event-card">
            {events.map((event, index) => (
                <div key={index} style={eventStyle(event, columnID, numColumns)} className="event-content basic-box">
                    <div className="event-time">
                        <div>{event.startTime}</div>
                        <div>{event.endTime}</div>
                    </div>
                    <div className="event-info">
                        <div id="info-detailed">
                            <div id="event-name">{event.eventName}</div>
                            <div id="date">{event.eventDate}</div>
                        </div>
                        <div id="event-desc">{event.description}</div>
                        <div id="location">@: {event.location}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}