import { createContext, useState } from "react";

export let GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    let [isAuth, setAuth] = useState(false);
    let [isLoginPage, set_isLoginPage] = useState(false);
    let [current_user, set_current_user] = useState(localStorage.getItem("current_user") || "Login/Register");

    return (
        <GlobalContext.Provider value={{ isAuth, setAuth, isLoginPage, set_isLoginPage, current_user, set_current_user }}> {children} </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;
