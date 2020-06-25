import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import PrivateRoute from './utilities/PrivateRoute';
import Login from './components/Login';
import Messaging from './components/Messaging';

const App = (props) => {

    const [isCompatible, setIsCompatible]   = useState(true);
    const [loginOrReg, setLoginOrReg]       = useState('Login');
    const [username, setUsername]           = useState(false);

    const [isDisabled, setIsDisabled]       = useState(true);
    const [userColor, setUserColor]         = useState(false);
    const [userMessage, setUserMessage]     = useState('')

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // useEffect(() => {
    //     function checkIfCompaitbleWithWebSocket () {
    //         let compatible = window.WebSocket || window.MozWebSocket;
    //         if(compatible) return true;
    //         return false
    //     }

    //     let isCompatible = checkIfCompaitbleWithWebSocket();
    //     setIsCompatible(isCompatible);
    //     return function cleanup() {
    //         checkIfCompaitbleWithWebSocket();
    //     };
    // }, []);

    useEffect(() => {
        if( props.location.pathname === "/register") {
            setLoginOrReg('Register');
            props.history.push('/register');
        }
        console.log('USEEFFECT', props)
    }, []);

    
    if ( localStorage.getItem('token') && localStorage.getItem('token') !== "undefined" ) {
        if (!isCompatible) {
            return (
                <div className="not-compatible">
                    <h2>Your browser does not support the WebSocket protocol.<br />Please install a browser that does.</h2>
                </div>
            );
        };

        const connection = new WebSocket('ws://127.0.0.1:8000/');
        console.log("connection",connection);

        connection.onopen = function() {
            setIsDisabled(false);
        }

        connection.onmessage = function(message) {
            try {
                let json = JSON.parse(message.data);
                console.log('json', json);
            } catch (e) {
                console.log('This doesn\'t look like JSON: ', message.data);
                return;
            }
        }

        connection.onerror = function(err) {
            setUserMessage('Sorry, but there\'s some problem with your connection or the server is down.');
        }
    }

    function onClickHandler(e) {
        if(e.target.innerText === "Login") setLoginOrReg('Login');
        if(e.target.innerText === "Register") setLoginOrReg('Register');
    }


    let msgVals = {
        isDisabled,
        username,
        userColor,
        setUserColor,
        userMessage,
        setUserMessage
    }
    
    let loginRegVals = {
        setUsername,
        username,
        loginOrReg,
        setLoginOrReg,
        onClickHandler
    }

    return (
        <div className="App">
           <Route exact path="/" render={ props => localStorage.getItem("token") && localStorage.getItem("token") !== "undefined" ? <Redirect to="/home" /> : <Login {...props} loginRegVals={loginRegVals}  /> } />
           <Route path="/register" render={ props => <Login {...props} loginRegVals={loginRegVals}  /> } />
           <PrivateRoute path="/home" component={Messaging}  {...msgVals} />
        </div>
    );
}

export default App;
