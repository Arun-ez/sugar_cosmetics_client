import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthValidationLayer = ({ children, comp }) => {

    const navigate = useNavigate();

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
        navigate(-1);
    }

    return children;
}

export { AuthValidationLayer }
