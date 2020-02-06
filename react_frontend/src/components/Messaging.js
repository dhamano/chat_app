import React, { useEffect, userState } from 'react';

const Messaging = props => {
    return (
        <div className="chat-wrapper">
            <div id="content"></div>
            <div>
                <span id="status">Connecting&hellip;</span>
                <input type="text" id="input" disabled="disabled" />
            </div>
        </div>
    );
};

export default Messaging;