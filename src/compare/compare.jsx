import React from "react";

export function Compare() {
    return (
        <main>
            <h1>Compare Calendars</h1>

            <div class="compare-calendars">
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
        </main>
    )
}