import React from "react";

export function Calendar() {
    return (
        <main>
            <div id="calendar-main">
                <div id="calendar-title">
                    <h1>Calendar</h1>
                    <button class="basic-box">Tasks</button>
                </div>
                <div id="event-block">
                    <div class="event-content basic-box">
                        <div class="event-time">
                            <div>8:00</div>
                            <div>9:00</div>
                        </div>
                        <div class="event-info">
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
            <div id="taskbar" class="basic-box">
                <p style="margin:0;">Tasks</p>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                </ul>
            </div>
        </main>
    )
}