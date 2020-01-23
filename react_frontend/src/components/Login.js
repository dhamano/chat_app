import React, { useState } from 'react';


const Login = props => {
    function handleOnChange (e) {
        props.setUserName(e.target.value);
    };

    function handleSubmit (e) {
        e.preventDefault();
        console.log('event target value', e.target.value);
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={handleOnChange} value={!props.userName ? '' : props.userName} />
            </form>
        </div>
    )
};

export default Login;