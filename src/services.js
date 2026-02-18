export function submitEvent(username, eventData) {
    const userEvents = JSON.parse(localStorage.getItem(username) || '[]');
    userEvents.push(eventData);
    localStorage.setItem(username, JSON.stringify(userEvents));
    console.log(`User: ${username}`);
    console.log(eventData);
}

export function GetEvents(username) {
    const userEvents = JSON.parse(localStorage.getItem(username) || '[]');
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