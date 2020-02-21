import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { login, register } from '../services';
import { setLocalStorage } from '../utilities';

const Login = props => {
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    function handleOnChange (e) {
        if(e.target.name === 'username') props.loginRegVals.setUsername(e.target.value);
        if(e.target.name === 'password') setPassword(e.target.value);
        if(e.target.name === 'confirm-password') setConfirmPassword(e.target.value);
    };

    async function handleSubmitLogin (e) {
        e.preventDefault();
        console.log('login', props.loginRegVals.username, password);
        await login({ username: props.loginRegVals.username, password })
                            .then(res => {
                                console.log('login res', res);
                                setLocalStorage("token", res.data.token);
                                setLocalStorage("username", res.data.username);
                                props.history.push('/')
                            })
    }

    async function handleSubmitRegister (e) {
        e.preventDefault();
        if( password !== confirmPassword) {
            setPasswordErr(true);
            return;
        }
        await register({ username: props.loginRegVals.username, password })
                            .then(res => {
                                console.log('register', res);
                                if ( res.status === 201 ) {
                                    setLocalStorage("token", res.data.token);
                                    setLocalStorage("username", res.data.username);
                                    props.history.push('/')
                                } else {
                                    console.log('ERROR');
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
                            <div>
                                <input id="reg-username" onChange={handleOnChange} value={!props.loginRegVals.username ? '' : props.loginRegVals.username} name="username" type="text" placeholder="username" autoComplete="username" required />
                                <label htmlFor="reg-username">username</label>
                            </div>
                            <div>
                                <input id="reg-password" className={ passwordErr ? 'error' : '' } onChange={handleOnChange} value={!password ? '' : password} name="password" type="password" placeholder="password" autoComplete="new-password" required />
                                <label htmlFor="reg-password">password</label>
                            </div>
                            <div>
                                <input id="confirmPassword" className={ passwordErr ? 'error' : '' } onChange={handleOnChange} value={!confirmPassword ? '' : confirmPassword} name="confirm-password" type="password" placeholder="confirm password" autoComplete="new-password" required />
                                <label htmlFor="confirmPassword">confirm password</label>
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