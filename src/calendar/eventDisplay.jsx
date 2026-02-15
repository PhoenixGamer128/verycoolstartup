import React from "react";
import { GetEvents } from "../services";

function eventStyle(event) {
    return {
        position: "absolute",
        width: "50%",
        backgroundColor: event.eventColor,
        // Recalculate height and top position based on start and end times (assuming times are in "HH:MM" format)
        height: (event.endTime-event.startTime)/1000/60 + "px", // Convert time difference from milliseconds to minutes and set as height
        top: event.startTime/1000/60 + "px" // Convert start time from milliseconds to minutes and set as top position
     };
}

export function RenderEvents(props) {
    const events = GetEvents(props.username);
    return (
        <div id="event-block">
            {events.map((event, index) => (
                <div key={index} style={eventStyle(event)} className="event-content basic-box">
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