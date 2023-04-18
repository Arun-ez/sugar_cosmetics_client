import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILED } from "./action_type";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const native_login = async (dispatch, get_state) => {

    const { form_data } = dispatch(get_state).AuthReducer;

    try {
        let response = await fetch(`${SERVER_URL}/account/login`, {
            method: "POST",
            body: JSON.stringify(form_data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        let json = await response.json();

        dispatch({ type: LOGIN_SUCCESS, payload: { token: json.success.token, user: { name: json.success.name, email: json.success.email } } });
    } catch (error) {
        dispatch({ type: LOGIN_FAILED, payload: error.message });
    }
}

const token_login = async (dispatch, get_state) => {

    const { token } = dispatch(get_state).AuthReducer;

    try {
        let response = await fetch(`${SERVER_URL}/account/token`, {
            method: "POST",
            headers: {
                Authentication: `Bearer ${token}`
            }
        })

        let json = await response.json();

        dispatch({ type: LOGIN_SUCCESS, payload: { token: token, user: { name: json.success.name, email: json.success.email } } });
    } catch (error) {
        dispatch({ type: LOGIN_FAILED, payload: error.message });
    }
}

const signup_request = async (dispatch, get_state) => {

    const { form_data } = dispatch(get_state).AuthReducer;

    try {
        let response = await fetch(`${SERVER_URL}/users?email=${form_data.email}`, {
            method: "POST",
            body: JSON.stringify(form_data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let json = await response.json();
        dispatch({ type: SIGNUP_SUCCESS });
    } catch (error) {
        const [key, message] = error.message.split(":");
        dispatch({ type: SIGNUP_FAILED, payload: message });
    }
}


const logout_request = (dispatch, get_state) => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("current_user");
    dispatch({ type: LOGOUT_REQUEST });
}
