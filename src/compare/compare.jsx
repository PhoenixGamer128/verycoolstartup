import React from "react";
import { RenderEvents } from "../eventDisplay";

export function Compare(props) {
    function handleSubmit(e) {
        e.preventDefault();
    }
    
    return (
        <main id="compare-page">
            <h1>Compare Calendars</h1>
            <form onSubmit={ handleSubmit } style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="text" placeholder="Enter username to compare with" />
                <button type="submit">Compare</button>
            </form>
            <div className="event-window">
                <RenderEvents username={props.username} />
                <RenderEvents username={props.username} />
            </div>
        </main>
    )
}