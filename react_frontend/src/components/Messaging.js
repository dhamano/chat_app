import React, { useState, useEffect } from 'react';

import socketIOClient from 'socket.io-client';

const Messaging = props => {
    
    let username = localStorage.getItem('username') || 'user';
    let room = 'general';

    if (props.msgVals) {
        username = props.username;
        room = props.chatSettings.chatRoom;
    }
    
    const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_ENDPOINT);

    const [message, setMessage] = useState('');
    const [textArea, setTextArea] = useState([]);

    useEffect( () => {
        socket.emit('join', {
            username: 'user',
            room: props.chatSettings.chatRoom || 'general',
        })
    }, [props.chatSettings.chatRoom])

    socket.on('message', (data) => {
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
        socket.emit('sendMessage', {
            // author: props.msgVals.username,
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