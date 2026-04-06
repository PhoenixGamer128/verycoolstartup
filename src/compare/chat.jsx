import React from "react";
import "./chat.css";

function Chat({ websocket, name }) {
    const [chatName, setChatName] = React.useState(name || "");

    return (
        <main>
            {/*<Name updateName={setName} />*/}
            <Conversation websocket={websocket} />
            <Message name={chatName} websocket={websocket} />
            <p>Name: {chatName}</p>
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

    let disabled = !name;
    React.useEffect(() => {
        disabled = !websocket.connected;
    }, [websocket.connected]);
    return (
        <main>
            <fieldset id='chat-fieldset'>
                {/*<legend>Chat</legend>*/}
                <input disabled={disabled} type='text' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={doneMessage} />
                <button disabled={disabled} onClick={sendMsg}>Send Message</button>
            </fieldset>
        </main>
    )
}

function Conversation({ websocket }) {
    const [chats, setChats] = React.useState([]);
    const THRESHOLD = 20;
    const containerRef = React.useRef(null);
    const shouldAutoScrollRef = React.useRef(true);

    React.useEffect(() => {
        websocket.addObserver((chat) => {
            setChats((prevChats) => [...prevChats, chat]);
        });
    }, [websocket]);

    function updateAutoScrollFlag() {
        const el = containerRef.current;
        if (!el) {
            return;
        }

        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        shouldAutoScrollRef.current = distanceFromBottom <= THRESHOLD;
    }

    React.useEffect(() => {
        const el = containerRef.current;
        if (!el) {
            return;
        }

        if (shouldAutoScrollRef.current) {
            el.scrollTop = el.scrollHeight;
        }
    }, [chats]);

    const chatEls = chats.map((chat, index) => (
        <div key={index}>
            <span className={chat.event}>{chat.from}</span> {chat.message}
        </div>
    ));

    return (
        <main className='conversation-main'>
            <div className='conversation' ref={containerRef} onScroll={updateAutoScrollFlag}>
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
            this.connected = true;
            this.notifyObservers('system', 'websocket', 'connected');
        };

        this.websocket.onmessage = async (event) => {
            const text = await event.data.text();
            const chat = JSON.parse(text);
            this.notifyObservers('received', chat.from, chat.message);
        };

        this.websocket.onclose = () => {
            this.connected = false;
            this.notifyObservers('system', 'websocket', 'disconnected');

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