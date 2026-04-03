import React from "react";

function Chat({ websocket }) {
    const [name, setName] = React.useState("");

    return (
        <main>
            <Name updateName={setName} />
            <Message name={name} websocket={websocket} />
            <Conversation websocket={websocket} />
        </main>
    )
}

function Name({ updateName }) {
    return (
        <main>
            <div className='name'>
                <fieldset id='name-fieldset'>
                    <legend>Name</legend>
                    <input type='text' onChange={(e) => updateName(e.target.value)} />
                </fieldset>
            </div>
        </main>
    )
}

function Message({ name, websocket }) {
    const [message, setMessage] = React.useState("");

    function doneMessage(e) {
        if (e.key === 'Enter') {
            sendMsg();
        }
    }

    function sendMsg() {
        if (name && message) {
            websocket.sendMessage(name, message);
            setMessage("");
        }
    }

    const disabled = name === '' || !websocket.connected;
    return (
        <main>
            <fieldset id='chat-fieldset'>
                <legend>Chat</legend>
                <input disabled={disabled} type='text' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={doneMessage} />
                <button disabled={disabled} onClick={sendMsg}>Send</button>
            </fieldset>
        </main>
    )
}

function Conversation({ websocket }) {
    const [chats, setChats] = React.useState([]);

    React.useEffect(() => {
        websocket.addObserver((chat) => {
            setChats((prevChats) => [...prevChats, chat]);
        });
    }, [websocket]);

    const chatEls = chats.map((chat, index) => (
        <div key={index}>
            <span className={chat.event}>{chat.from}</span> {chat.message}
        </div>
    ));

    return (
        <main>
            <div className='conversation'>
                {chatEls}
            </div>
        </main>
    )
}

class ChatClient {
    observers = [];
    connected = false;

    constructor() {
        this.protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        this.websocket = new WebSocket(`${this.protocol}://${window.location.host}/ws`);

        this.websocket.onopen = () => {
            this.notifyObservers('system', 'websocket', 'connected');
            this.connected = true;
        };

        this.websocket.onmessage = async (event) => {
            const text = await event.data.text();
            const chat = JSON.parse(text);
            this.notifyObservers('received', chat.from, chat.message);
        };

        this.websocket.onclose = () => {
            this.notifyObservers('system', 'websocket', 'disconnected');
            this.connected = false;
        };
    }

    sendMessage(name, msg) {
        this.notifyObservers('sent', 'me', msg);
        this.websocket.send(JSON.stringify({ from: name, message: msg }));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(event, from, message) {
        this.observers.forEach((observer) => observer({ event, from, message }));
    }
}

export { Chat, ChatClient };