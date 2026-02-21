import React from "react";
import { GetEvents, DeleteEvent } from "./services";

function eventStyle(event) {
    const startTimeMins = parseInt(event.startTime.split(':')[0]) * 60 + parseInt(event.startTime.split(':')[1]);
    return {
        position: "absolute",
        width: "100%",
        backgroundColor: event.eventColor,
        height: `${event.duration/60/24*100}%`, // Convert duration from minutes to fraction of a day, then to percentage
        top: `${startTimeMins/60/24*100}%`, // Convert start time from minutes to fraction of a day, then to percentage
        left: 0,
    }
}

function eventPopUp(props, event, setPopupOpen, refreshEvents) {
    const handleDelete = () => {
        DeleteEvent(props.username, event.id);
        setPopupOpen(false);
        refreshEvents(); // Refresh events after deletion
    };

    return (
        <div className="pop-up">
            <div className="event-content basic-box" style={{ backgroundColor: event.eventColor }}>
                <div className="event-time">
                    <div>{event.startTime}</div>
                    <div>{event.endTime}</div>
                </div>
                <div className="event-info">
                    <div id="info-detailed">
                        <div id="event-name">{event.eventName}</div>
                        <div id="date">{event.eventDate}</div>
                        <button className="button" onClick={() => setPopupOpen(false)}>X</button>
                    </div>
                    <div id="event-desc">{event.description}</div>
                    <div id="location">@: {event.location}</div>
                    <button className="button" onClick={handleDelete}>Delete Event</button>
                </div>
            </div>
        </div>
    )
}

export function RenderEvents(props) {
    const [events, setEvents] = React.useState([]);
    const [popupOpen, setPopupOpen] = React.useState(false);
    const [popupEvent, setPopupEvent] = React.useState(null);

    const refreshEvents = () => {
        setEvents(GetEvents(props.username) || []);
    };

    React.useEffect(() => {
        refreshEvents();
    }, []);

    if (!events || events.length === 0) {
        console.log("No events to display.");
        return <div className="event-day"><div className="no-events">No events to display.</div></div>;
    }
    return (
        <div className="event-day">
            <div id="event-card">
                {events.filter(event => event.eventDate === props.renderDate).map((event, index) => (
                    <div key={index} style={eventStyle(event)} className="calendar-event clickable" onClick={() => { setPopupOpen(true); setPopupEvent(event); }}>
                        <div id="event-name">{event.eventName}</div>
                    </div>
                ))}
                {popupOpen && popupEvent && eventPopUp(props, popupEvent, setPopupOpen, refreshEvents)}
            </div>
        </div>
    )
}