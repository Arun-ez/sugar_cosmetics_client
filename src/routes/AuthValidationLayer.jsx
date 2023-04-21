import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthValidationLayer = ({ children, comp }) => {

    let isAuth = useSelector((store) => {
        return store.AuthReducer.isAuth;
    })

    if (!isAuth) {
        if (comp === "login") {
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
