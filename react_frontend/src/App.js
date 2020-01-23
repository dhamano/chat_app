import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import PrivateRoute from './utilities/PrivateRoute';
import Login from './components/Login';
import Messaging from './components/Messaging';

function App() {

    const [isCompatible, setIsCompatible] = useState();
    const [userColor, setUserColor] = useState(false);
    const [userName, setUserName] = useState(false);

    const [userMessage, setUserMessage] = useState('')

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    useEffect(() => {
        function checkIfCompaitbleWithWebSocket () {
            let compatible = window.WebSocket || window.MozWebSocket;
            if(compatible) return true;
            return false
        }

        let isCompatible = checkIfCompaitbleWithWebSocket();
        setIsCompatible(isCompatible);
    }, []);

    if (!isCompatible) {
        return (
            <div className="not-compatible">
                <h2>Your browser does not support the WebSocket protocol.<br />Please install a browser that does.</h2>
            </div>
        );
    };

    const connection = new WebSocket('ws://127.0.0.1/8000');

    connection.onopen = function() {
        
    }

    return (
        <div className="App">
           <Route exact path="/" render={ props => localStorage.getItem("token") ? <Redirect to="/home" /> : <Login {...props} setUserName={setUserName} userName={userName} /> } />
           <PrivateRoute path="/home" component={Messaging} />
        </div>
    );
}

export default App;
