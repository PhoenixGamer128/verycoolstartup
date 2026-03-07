const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const authCookieName = 'authToken';

// In-memory data stores for users and events
let users = [];
let events = [];

// Service port. You can specify a port as a command-line argument, otherwise it defaults to 4000.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve static files from the 'public' directory (for frontend assets)
app.use(express.static('public'));
// JSON body parsing middleware
app.use(express.json());
// Cookie parsing middleware for tracking auth tokens
app.use(cookieParser());

// Service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);




function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, { 
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});