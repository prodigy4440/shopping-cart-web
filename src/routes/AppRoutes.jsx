// Components/AppRoute.js

import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthStateContext } from '../context/Auth';

// import { useAuthState } from '../../Context'

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
// console.log({AuthStateContext:useContext(AuthStateContext)})
    const {user:{isAuthenticated}} = useContext(AuthStateContext)
    return (
        <Route
            path={path}
            render={props =>
                isPrivate && !isAuthenticated ? (
                    <Redirect
                        to={{ pathname: "/login" }}
                    />
                ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    )
}

export default AppRoutes
