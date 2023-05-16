import { createContext, useState } from "react";

export let GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    let [isLoginPage, set_isLoginPage] = useState(false);
    let [current_user, set_current_user] = useState(JSON.parse(localStorage.getItem("current_user")) || { name: "Login/Register", email: "", number: "" });

    return (
        <GlobalContext.Provider value={{ isLoginPage, set_isLoginPage, current_user, set_current_user }}> {children} </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;
