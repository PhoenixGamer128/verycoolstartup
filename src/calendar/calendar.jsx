import React from "react";
import './calendar.css';
import { RenderEvents } from "../eventDisplay";

export function Calendar(props) {

    const [days, setDays] = React.useState(1);
    //const [datesToShow, setDatesToShow] = React.useState([]);

    const datesToShow = () => {
        const newDateInfo = new Date();
        let datesArray = [];
        for (let i = 0; i < days; i++) {
            const date = new Date(newDateInfo);
            date.setDate(newDateInfo.getDate() + i);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            datesArray.push(`${year}-${month}-${day}`);
        }
        return datesArray;
    };


    return (
        <main>
            <div id="calendar-main">
                <div id="calendar-title">
                    <h1>Calendar</h1>
                    {/*<button className="basic-box">Tasks</button>*/}
                    <div>
                        <p>Days to show:</p>
                        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
                            <option value="">Days to show</option>
                            <option value="1">1 day</option>
                            <option value="2">2 days</option>
                            <option value="3">3 days</option>
                        </select>
                    </div>
                </div>
                <div className="event-window">
                    {datesToShow().map((date) => (
                        <RenderEvents key={date} username={props.username} renderDate={date} />
                    ))}
                </div>
            </div>
            {/*
            <div id="taskbar" className="basic-box">
                <p>Tasks</p>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                </ul>
            </div>
            */}
        </main>
    )
}