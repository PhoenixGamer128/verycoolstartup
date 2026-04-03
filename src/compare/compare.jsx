import React from "react";
import { RenderEvents } from "../eventDisplay";
import { Chat, ChatClient } from "./chat";

export function Compare(props) {
    const [user2, setUser2] = React.useState("");
    const [user2input, setUser2Input] = React.useState("");
    const chatClient = React.useMemo(() => new ChatClient(), []);

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;

    function handleSubmit(e) {
        e.preventDefault();
        setUser2(user2input.trim());
    }
    
    return (
        <main id="compare-page">
            <h1>Compare Calendars</h1>
            <form onSubmit={ handleSubmit } style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="text" placeholder="Enter username to compare with" value={user2input} onChange={(e) => setUser2Input(e.target.value)} />
                <button type="submit">Compare</button>
            </form>
            <Chat websocket={chatClient} />
            <div className="event-window">
                <RenderEvents username={props.username} numColumns={user2 ? 2 : 1} columnID={0} renderDate={currentDate} />
                {user2 && <RenderEvents username={user2} publicOnly={true} numColumns={2} columnID={1} renderDate={currentDate} />}
            </div>
        </main>
    )
}