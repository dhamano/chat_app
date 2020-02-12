import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route render={ props => localStorage.getItem("token") ? <Component {...props} {...rest} /> : <Redirect to="/" /> } />
    );
}

export default PrivateRoute;