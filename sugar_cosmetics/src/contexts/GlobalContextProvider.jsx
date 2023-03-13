import { createContext, useState } from "react";

export let GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {

    let [isAuth, setAuth] = useState(false);
    let [data, setData] = useState([]);
    let [cart, setCart] = useState([]);

    return (
        <GlobalContext.Provider value={{ isAuth, setAuth, data, setData, cart, setCart }}> {children} </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;
