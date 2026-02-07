import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './page-styles.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Calendar } from './calendar/calendar';
import { AddEvent } from './addEvent/addEvent';
import { Compare } from './compare/compare';
import { Tasks } from './tasks/tasks';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav name="nav-bar">
          <ul>
            <li id="nav-logo">Path for Eternity</li>
            <li><NavLink className="button" to="">Home page</NavLink></li>
            <li><NavLink className="button" to="calendar">Calendar page</NavLink></li>
            <li><NavLink className="button" to="addEvent">Add event</NavLink></li>
            <li><NavLink className="button" to="compare">Compare events</NavLink></li>
            <li><NavLink className="button" to="tasks">Tasks</NavLink></li>
            <li><NavLink className="button" to="about">About</NavLink></li>
            <li><NavLink className="button" to="https://simon.pathforeternity.click" target="_blank">Simon</NavLink></li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/addEvent' element={<AddEvent />} />
          <Route path='/compare' element={<Compare />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <div>by Hugo Whitaker</div>
          <a href="https://github.com/PhoenixGamer128/verycoolstartup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}