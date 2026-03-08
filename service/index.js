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

// User registration endpoint
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ message: 'Username already exists' });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.id);
        res.send({ username: user.username });
    }
});

// User login endpoint
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.passwordHash)) {
        user.authToken = uuid.v4();
        setAuthCookie(res, user.authToken);
        res.send({ username: user.username });
        return;
    }
    res.status(401).send({ message: 'Invalid username or password' });
});

// Delete user endpoint
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('authToken', req.cookies[authCookieName]);
    if (user) {
        delete user.authToken;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to authenticate requests
const verifyAuth = async (req, res, next) => {
    const user = await findUser('authToken', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ message: 'Unauthorized' });
    }
};

// Create event endpoint
apiRouter.post('/events', verifyAuth, async (req, res) => {
    const user = await findUser('authToken', req.cookies[authCookieName]);
    events.push({
        id: uuid.v4(),
        userId: user.id,
        eventName: req.body.eventName,
        eventColor: req.body.eventColor,
        eventDate: req.body.eventDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        duration: req.body.duration,
        location: req.body.location,
        description: req.body.description,
        availability: req.body.availability,
        publicEvent: req.body.publicEvent,
    });
    res.status(201).end();
});

// Get events endpoint
apiRouter.get('/events', verifyAuth, async (req, res) => {
    const user = await findUser('authToken', req.cookies[authCookieName]);
    const userEvents = events.filter(event => event.userId === user.id);
    res.send(userEvents);
});

// Get public events from a specific user endpoint
apiRouter.get('/events/public/:username', verifyAuth, async (req, res) => {
    const selectedUser = await findUser('username', req.params.username);
    if (!selectedUser) {
        res.status(404).send({ message: 'User not found' });
        return;
    }

    const publicEvents = events.filter(
        (event) =>
            event.userId === selectedUser.id &&
            (event.publicEvent === true || event.publicEvent === 'true')
    );
    res.send(publicEvents);
});

// Delete event endpoint
apiRouter.delete('/events/:id', verifyAuth, async (req, res) => {
    const user = await findUser('authToken', req.cookies[authCookieName]);
    events = events.filter(event => event.id !== req.params.id && event.userId === user.id);
    res.status(204).end();
});

// Global error handling middleware
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Helper functions
async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        passwordHash: passwordHash,
        id: uuid.v4(),
    };
    users.push(user);
    return user;
}

async function findUser(key, value) {
    if (!value) return null;
    return users.find(user => user[key] === value);
}


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