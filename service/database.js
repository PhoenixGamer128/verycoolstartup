const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.clusterUrl}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('verycoolstartup');
const usersCollection = db.collection('users');
const eventsCollection = db.collection('events');

// user in this file is to be a json format of username and password

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return usersCollection.findOne({ username: username });
}

function getUserByAuthToken(authToken) {
  return usersCollection.findOne({ authToken: authToken });
}

async function addUser(user) {
    await usersCollection.insertOne(user);
}

async function updateUser(user) {
    await usersCollection.updateOne({ username: user.username }, { $set: user });
}

async function addEvent(event) {
    await eventsCollection.insertOne(event);
}

function getEventsByUserId(userId) {
    return eventsCollection.find({ userId: userId }).toArray();
}

function deleteEventById(eventId) {
    return eventsCollection.deleteOne({ id: eventId });
}

module.exports = {
    getUser,
    getUserByAuthToken,
    addUser,
    updateUser,
    addEvent,
    getEventsByUserId,
    deleteEventById,
};