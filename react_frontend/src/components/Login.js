import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import FontAwesomeIcon from 'react-fontawesome';

import { NavLink } from 'react-router-dom';
import { login, register } from '../services';
import { setLocalStorage } from '../utilities';

const Login = props => {
    const [password, setPassword]           = useState(false);
    const [usernameErr, setUsernameErr]     = useState(false);
    const [passwordErr, setPasswordErr]     = useState(false);
    const [showPassword, setShowPassword]   = useState(false);
    const [passStr, setPassStr]             = useState(0);
    const [passStrMsg, setPassStrMsg]       = useState({
                                                  show: false,
                                                  class: '',
                                                  message: ''
                                              });
    const [showErrMsg, setShowErrMsg]       = useState({
                                                  show: false,
                                                  message: ''
                                              });

    const minPassStr = process.env.PASS_STR || 3;
    const minPassLen = process.env.PASS_LEN || 8;

    useEffect( () => {
        switch (passStr) {
            case 4:
                setPassStrMsg({ show: true, class: 'good', message: 'good' });
                break;
            case 3:
                setPassStrMsg({ show: true, class: 'okay', message: 'okay' });
                break;
            case 2:
            case 1:
            default:
                setPassStrMsg({ show: true, class: 'very-weak', message: 'too weak' });
        };
    }, [passStr]);

    function toggleShowPass(e) {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    function handleOnChange(e) {
        setShowErrMsg({ show: false, message: ''});
        setPasswordErr(false);
        if(e.target.name === 'username') props.loginRegVals.setUsername(e.target.value);
        if(e.target.name === 'password') {
            if ( props.location.pathname === "/register") {
                console.log('register change');
                setPassStrMsg({ show: true, ...passStrMsg});
            }
            setPassword(e.target.value);
            setPassStr(zxcvbn(e.target.value).score);
        }
    };

    async function handleSubmitLogin(e) {
        e.preventDefault();
        // console.log('login', props.loginRegVals.username, password);
        setShowErrMsg({show: false, message: '' });
        await login({ username: props.loginRegVals.username, password })
                            .then(res => {
                                if(res.status === 200) {
                                    setLocalStorage("token", res.data.token);
                                    setLocalStorage("username", res.data.username);
                                    props.history.push('/home')
                                } else {
                                    setShowErrMsg({ show: true, message: "Your username or password was incorrect."});
                                }
                            })
    }

    async function handleSubmitRegister (e) {
        e.preventDefault();
        let error = 0;
        if (props.loginRegVals.username.length < 2) {
            error++;
            setUsernameErr(true);
        }
        if (password.length < minPassLen) {
            error += 2;
            setPasswordErr(true);
        }
        if (passStr < minPassStr) {
            error += 4;
            setPasswordErr(true);
        }
        switch (error) {
            case 1:
                setShowErrMsg({ show: true, message: 'username too short'})
                return false;
            case 2:
                setShowErrMsg({ show: true, message: 'password too short'})
                return false;
            case 3:
                setShowErrMsg({ show: true, message: 'username too short and password too short'})
                return false;
            case 4:
                setShowErrMsg({ show: true, message: 'password too weak'})
                return false;
            case 5:
                setShowErrMsg({ show: true, message: 'username too short and password too weak'})
                return false;
            case 6:
                setShowErrMsg({ show: true, message: 'password too short and weak'})
                return false;
            case 7:
                setShowErrMsg({ show: true, message: 'username and password too short and weak'})
                return false;
            default:
                break;
        }

        await register({ username: props.loginRegVals.username, password })
                            .then(res => {
                                console.log('register', res);
                                if ( res.status === 201 ) {
                                    setLocalStorage("token", res.data.token);
                                    setLocalStorage("username", res.data.username);
                                    props.history.push('/home')
                                } else {
                                    console.log('ERROR');
                                    setShowErrMsg({ show: true, message: 'Please try a different username.' })
                                }
                            })
    }

    return (
        <div className="login-reg-page">
            <div className="login-reg-container">
                <div className={`form-container ${props.loginRegVals.loginOrReg === 'Login' ? 'login' : 'register'}`}>
                    <ul>
                        <li><NavLink onClick={props.loginRegVals.onClickHandler} exact to="/">Login</NavLink></li>
                        <li><NavLink onClick={props.loginRegVals.onClickHandler} to="/register">Register</NavLink></li>
                    </ul>
                    { props.loginRegVals.loginOrReg === "Login" ? (
                    <div className="login">
                        <form onSubmit={handleSubmitLogin}>
                            {
                                showErrMsg.show && <div className="error">{showErrMsg.message}</div>
                            } 
                            <div>
                                <input id="username" onChange={handleOnChange} value={!props.loginRegVals.username ? '' : props.loginRegVals.username} name="username" type="text" placeholder="username" autoComplete="username" required />
                                <label htmlFor="username">username</label>
                            </div>
                            <div>
                                <input id="password" onChange={handleOnChange} value={!password ? '' : password} name="password" type="password" placeholder="password" autoComplete="current-password" required />
                                <label htmlFor="password">password</label>
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    ) : (
                    <div className="register">
                        <form onSubmit={handleSubmitRegister}>
                            {
                                showErrMsg.show && <div className="error">{showErrMsg.message}</div>
                            } 
                            <div>
                                <input id="reg-username" className={ usernameErr ? 'input-error' : '' } onChange={handleOnChange} value={!props.loginRegVals.username ? '' : props.loginRegVals.username} name="username" type="text" placeholder="username" autoComplete="username" required />
                                <label htmlFor="reg-username">username</label>
                            </div>
                                
                            <div>
                                <input id="reg-password" className={ passwordErr ? 'input-error' : '' } onChange={handleOnChange} value={!password ? '' : password} name="password" type={`${ showPassword ? 'text' : 'password' }`} placeholder="password" autoComplete="new-password" required />
                                <a href="#reg-password" aria-hidden="true" onClick={toggleShowPass} className='toggle-show-pass'><FontAwesomeIcon name={`${ showPassword ? 'eye-slash' : 'eye' }`} /></a>
                                <label htmlFor="reg-password">password <span className={ passStrMsg.show ? `str-indicator ${ passStrMsg.class }` : 'hide' }>{passStrMsg.message}</span></label>
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Login;