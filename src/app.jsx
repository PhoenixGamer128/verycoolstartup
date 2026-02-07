import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './page-styles.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Calendar } from './calendar/calendar';
import { AddEvent } from './addEvent/addEvent';
import { Compare } from './compare/compare';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav name="nav-bar">
          <ul>
            <li id="nav-logo">Path for Eternity</li>
            <li><NavLink className="button" href="index.html">Home page</NavLink></li>
            <li><NavLink className="button" href="calendar.html">Calendar page</NavLink></li>
            <li><NavLink className="button" href="addEvent.html">Add event</NavLink></li>
            <li><NavLink className="button" href="compare.html">Compare events</NavLink></li>
            <li><NavLink className="button" href="tasks.html">Tasks</NavLink></li>
            <li><NavLink className="button" href="about.html">About</NavLink></li>
            <li><NavLink className="button" href="https://simon.pathforeternity.click" target="_blank">Simon</NavLink></li>
          </ul>
        </nav>


        <footer>
          <div>by Hugo Whitaker</div>
          <a href="https://github.com/PhoenixGamer128/verycoolstartup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  )
}