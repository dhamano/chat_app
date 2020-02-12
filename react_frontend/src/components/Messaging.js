import React, { useEffect, userState } from 'react';

const Messaging = props => {
    console.log('PROPS',props)
    return (
        <div className="chat-wrapper">
            <div id="content"></div>
            <div>
                { props.misDisabled ? (
                    <span id="status">Connecting&hellip;</span>
                ) : (
                    <div>
                        <div>{props.userMessage}</div>
                        <input type="text" id="input" placeholder="type msg here" />
                        <button type="submit" id="send">Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messaging;