
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILED } from "./action_types"

const initial = {
    isAuth: false,
    token: localStorage.getItem("sugar_token") || null,
    isLoading: false,
    isError: false,
    Error: "",
    form_data: {},
    signupStatus: false,
    user: { name: "Login/Register", email: "", number: "" }
}

const AuthReducer = (state = initial, action) => {
    switch (action.type) {

        case LOGIN_REQUEST: {
            return {
                ...state,
                form_data: action.payload,
                signupStatus: false,
                isLoading: true,
                isError: false
            }
        }

        case LOGIN_SUCCESS: {

            localStorage.setItem("sugar_token", action.payload.token);

            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: action.payload.user,
                isLoading: false,
                isError: false
            }
        }

        case LOGIN_FAILED: {
            return {
                ...state,
                token: null,
                user: { name: "Login/Register", email: "", number: "" },
                isLoading: false,
                isError: true,
                Error: action.payload
            }
        }

        case LOGOUT_REQUEST: {
            localStorage.removeItem("sugar_token");
            return initial;
        }

        case SIGNUP_REQUEST: {
            return {
                ...state,
                signupStatus: false,
                form_data: action.payload,
                isLoading: true,
                isError: false
            }
        }

        case SIGNUP_SUCCESS: {
            return {
                ...state,
                signupStatus: true,
                form_data: {},
                isLoading: false,
                isError: false
            }
        }

        case SIGNUP_FAILED: {
            return {
                ...state,
                signupStatus: false,
                form_data: {},
                isLoading: false,
                isError: true,
                Error: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export { AuthReducer }
