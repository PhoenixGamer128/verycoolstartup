import React from "react";
import { RenderEvents } from "../eventDisplay";

export function Compare(props) {
    const [user2, setUser2] = React.useState("");
    const [user2input, setUser2Input] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setUser2(user2input);
        if (JSON.parse(localStorage.getItem(user2input) || '[]').length === 0) {
            alert(`User ${user2input} has no events to compare.`);
            setUser2("");
        }
    }
    
    return (
        <main id="compare-page">
            <h1>Compare Calendars</h1>
            <form onSubmit={ handleSubmit } style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="text" placeholder="Enter username to compare with" value={user2input} onChange={(e) => setUser2Input(e.target.value)} />
                <button type="submit">Compare</button>
            </form>
            <div className="event-window">
                <RenderEvents username={props.username} numColumns={user2 ? 2 : 1} columnID={0} />
                {user2 && <RenderEvents username={user2} numColumns={2} columnID={1} />}
            </div>
        </main>
    )
}