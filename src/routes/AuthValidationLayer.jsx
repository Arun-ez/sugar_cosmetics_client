
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContextProvider'

const AuthValidationLayer = ({ children, comp }) => {

    let { isAuth, set_isLoginPage } = useContext(GlobalContext);

    if (!isAuth) {
        if (comp == "login") {
            return children;
        }

        return <Navigate to="/account" />
    }

    if (comp == "login") {
        return <Navigate to="/account/wishlist" />
    }

    return children;
}

export { AuthValidationLayer }
