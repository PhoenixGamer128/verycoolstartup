import React from "react";
import ReactDOM from "react-dom/client";

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
            websocket.send(`${name}: ${message}`);
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