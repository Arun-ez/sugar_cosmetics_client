import { createContext, useEffect, useState } from "react";

export let GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    let [isLoginPage, set_isLoginPage] = useState(false);
    let [current_user, set_current_user] = useState(JSON.parse(localStorage.getItem("current_user")) || { name: "Login/Register", email: "", number: "" });


    const [static_data, set_static_data] = useState([
        { title: 'BESTSELLERS', type: 'seller', data: null },
        { title: 'JUST-IN', type: 'eyes', data: null },
        { title: 'BUY NOW PAY LATER', type: 'face', data: null },
        { title: 'GIFTING', type: 'kit', data: null },
        { title: 'SUPER SAVERS', type: 'accessories', data: null },
        { title: 'SKINCARE BASICS', type: 'skincare', data: null },
    ])

    const load_home_static_products = async () => {

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/static`);

        const { data } = await response.json();

        set_static_data(data);

    }

    useEffect(() => {
        load_home_static_products();
    }, [])

    return (
        <GlobalContext.Provider value={{ static_data, load_home_static_products, isLoginPage, set_isLoginPage, current_user, set_current_user }}> {children} </GlobalContext.Provider>
    )
}

export { GlobalContextProvider };
