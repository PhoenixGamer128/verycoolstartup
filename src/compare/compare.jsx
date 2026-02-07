import React from "react";

export function Compare() {
    return (
        <main>
            <h1>Compare Calendars</h1>

            <div className="compare-calendars">
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
        </main>
    )
}