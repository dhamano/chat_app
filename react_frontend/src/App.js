import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PrivateRoute from './utilities/PrivateRoute';

import Login from './components/Login';
import Messaging from './components/Messaging';

const App = (props) => {

    const [isCompatible, setIsCompatible]   = useState(false);

    const [loginOrReg, setLoginOrReg]       = useState('Login');
    const [username, setUsername]           = useState('');

    const [chatSettings, setChatSettings]   = useState({
                                                    isDiabled: true,
                                                    userColor: '#333',
                                                    chatRoom: '',
                                                })
    // const [isDisabled, setIsDisabled]       = useState(true);
    // const [userColor, setUserColor]         = useState(false);
    // const [userMessage, setUserMessage]     = useState('')

    useEffect(() => {
        function checkIfCompaitbleWithWebSocket () {
            let compatible = window.WebSocket || window.MozWebSocket;
            if(compatible) return true;
            return false;
        }

        let isCompatible = checkIfCompaitbleWithWebSocket();
        setIsCompatible(isCompatible);
        return function cleanup() {
            checkIfCompaitbleWithWebSocket();
        };
    }, []);

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
    }

    function onClickHandler(e) {
        if(e.target.innerText === "Login") setLoginOrReg('Login');
        if(e.target.innerText === "Register") setLoginOrReg('Register');
    }


    let msgVals = {
        // isDisabled,
        // username,
        // userColor,
        // setUserColor,
        // userMessage,
        // setUserMessage
        username,
        chatSettings,
        setChatSettings
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
