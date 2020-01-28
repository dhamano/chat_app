import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = props => {
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    function handleOnChange (e) {
        if(e.target.name === 'username') props.loginRegVals.setUserName(e.target.value);
        if(e.target.name === 'password') setPassword(e.target.value);
        if(e.target.name === 'confirm-password') setConfirmPassword(e.target.value);
    };

    function handleSubmitLogin (e) {
        e.preventDefault();
        console.log('LOGIN SUBMIT', e.target.value);
    }

    function handleSubmitRegister (e) {
        e.preventDefault();
        if( password !== confirmPassword) {
            setPasswordErr(true);
            return;
        }
        console.log('REGISTER SUBMIT', e.target.value);
    }

    return (
        <div className="login-reg-page">
            <div className="login-reg-container">
                <div className="form-container">
                    <ul>
                        <li><NavLink onClick={props.loginRegVals.onClickHandler} to="/">Login</NavLink></li>
                        <li><NavLink onClick={props.loginRegVals.onClickHandler} to="/register">Register</NavLink></li>
                    </ul>
                    { props.loginRegVals.loginOrReg === "Login" ? (
                    <div className="login">
                        <form onSubmit={handleSubmitLogin}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input id="username" onChange={handleOnChange} value={!props.loginRegVals.username ? '' : props.loginRegVals.username} name="username" type="text" placeholder="username" autoComplete="username" />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input id="password" onChange={handleOnChange} value={!password ? '' : password} name="password" type="password" placeholder="password" autoComplete="current-password" />
                            </div>
                            <input type="submit" value="Login" />
                        </form>
                    </div>
                    ) : (
                    <div className="register">
                        <form onSubmit={handleSubmitRegister}>
                            <div>
                                <label htmlFor="reg-username">username</label>
                                <input id="reg-username" onChange={handleOnChange} value={!props.loginRegVals.username ? '' : props.loginRegVals.username} name="username" type="text" placeholder="username" autoComplete="username" />
                            </div>
                            <div>
                                <label htmlFor="reg-password">password</label>
                                <input id="reg-password" className={ passwordErr ? 'error' : '' } onChange={handleOnChange} value={!password ? '' : password} name="password" type="password" placeholder="password" autoComplete="new-password" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">confirm password</label>
                                <input id="confirmPassword" className={ passwordErr ? 'error' : '' } onChange={handleOnChange} value={!confirmPassword ? '' : confirmPassword} name="confirm-password" type="password" placeholder="confirm password" autoComplete="new-password" />
                            </div>
                            <input type="submit" value="Register" />
                        </form>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
    console.log("props login.js", props);
};

Login.propTypes = {
    userColor: PropTypes.bool || PropTypes.string,
    userMessage: PropTypes.string
}

export default Login;