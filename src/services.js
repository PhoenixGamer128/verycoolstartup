export function submitEvent(username, eventData) {
    const user = JSON.parse(localStorage.getItem(username));
    if (user) {
        // Generate unique ID using timestamp + random number
        const eventWithId = {
            id: Date.now() + Math.random().toString(36).slice(2, 9),
            ...eventData
        };
        user.events.push(eventWithId);
        localStorage.setItem(username, JSON.stringify(user));
        console.log(`User: ${username}`);
        console.log(eventWithId);
        return true;
    } else {
        console.error(`User ${username} not found.`);
        return false;
    }
}

export function GetEvents(username) {
    const user = JSON.parse(localStorage.getItem(username));
    const userEvents = user ? user.events : [];
    return userEvents;
}

function validateUser(username, password) {
    username = username || "";
    password = password || "";
    function isValidPassword(password) {
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return false;
        }
        return true;
    }

    if (username.length === 0) {
        alert("Username cannot be empty.");
        return false;
    }

    if (localStorage.getItem(username)) {
        alert(`User ${username} already exists.`);
        return false;
    }

    if (isValidPassword(password)) {
        return true;
       }
}

export function DeleteEvent(username, eventId) {
    const user = JSON.parse(localStorage.getItem(username));
    if (user) {
        user.events = user.events.filter(event => event.id !== eventId);
        localStorage.setItem(username, JSON.stringify(user));
        console.log(`Deleted event with ID: ${eventId}`);
    } else {
        console.error(`User ${username} not found.`);
    }
}


export function CreateUser(username, password) {
    if (validateUser(username, password)) {
        localStorage.setItem(username, JSON.stringify({ password, events: [] }));
        return true;
    }
}

export function LoginUser(username, password) {
    if (username.length === 0 || password.length === 0) {
        alert("Username and password cannot be empty.");
        return false;
    }
    const user = JSON.parse(localStorage.getItem(username));
    if (!user) {
        alert(`User ${username} does not exist.`);
        return false;
    }
    if (user.password !== password) {
        alert(`Incorrect password for user ${username}.`);
        return false;
    }
    return true;
}