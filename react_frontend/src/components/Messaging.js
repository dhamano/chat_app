import React, { useState } from 'react';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_ENDPOINT);
console.log('socket',socket);

const Messaging = props => {
    const [message, setMessage] = useState('');
    const [textArea, setTextArea] = useState([]);

    socket.on('RECIEVE_MESSAGE', (data) => {
        addMessage(data);
    });

    function addMessage(data) {
        console.log('addMessage',data);
        setTextArea([...textArea, data]);
    }

    function messageChangeHandler(e) {
        e.preventDefault();
        setMessage(e.target.value);
    }

    function sendMessage(e) {
        console.log('sendMessage MESSAGE', message);
        e.preventDefault();
        socket.emit('SEND_MESSAGE', {
            author: props.msgVals.username,
            message
        });
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
                        <input type="text" id="input" onChange={messageChangeHandler} value={message} placeholder="type msg here" />
                        <button type="submit" id="send" onClick={sendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messaging;