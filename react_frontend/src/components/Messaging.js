import React, { useState } from 'react';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_ENDPOINT);
console.log('socket',socket);

const Messaging = props => {
    const [message, setMessage] = useState('');
    const [textArea, setTextArea] = useState([]);

    socket.on('message', (data) => {
        addMessage(data);
    });

    function addMessage(data) {
        console.log(data);
        setTextArea([...textArea, data]);
    }

    function sendMessage(e) {
        e.preventDefault();
        socket.emit('sendMessage', {
            author: props.username,
            message
        });
        addMessage(message);
        setMessage('');
    };

    return (
        <div className="chat-wrapper">
            <div id="content">
                {
                    textArea.map(msg => {
                        return(
                            <div class="message">{msg.author}: {msg.message}</div>
                        )
                    })
                }
            </div>
            <div>
                { props.misDisabled ? (
                    <span id="status">Connecting&hellip;</span>
                ) : (
                    <div>
                        <div>{props.userMessage}</div>
                        <input type="text" id="input" placeholder="type msg here" />
                        <button type="submit" id="send" onClick={sendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messaging;