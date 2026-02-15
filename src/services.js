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