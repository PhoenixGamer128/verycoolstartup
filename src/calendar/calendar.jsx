import React from "react";

export function Calendar() {
    return (
        <main>
            <div id="calendar-main">
                <div id="calendar-title">
                    <h1>Calendar</h1>
                    <button className="basic-box">Tasks</button>
                </div>
                <div id="event-block">
                    <div className="event-content basic-box">
                        <div className="event-time">
                            <div>8:00</div>
                            <div>9:00</div>
                        </div>
                        <div className="event-info">
                            <div id="info-detailed">
                                <div id="event-name">Name</div>
                                <div id="date">Today</div>
                            </div>
                            <div id="event-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a purus orci. Ut mattis mollis lacinia.</div>
                            <div id="location">@: BYU</div>
                        </div>
                    </div>
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