import { Box, Image, Flex, Heading, InputGroup, InputLeftAddon, Input, Text, Button } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../contexts/GlobalContextProvider';
import { Login } from './Login';
import { Otp } from './Otp';
import { Register } from './Register';

const Loginpage = () => {
    let navigate = useNavigate();
    let [process_index, set_process_index] = useState(0);
    let { set_isLoginPage, setAuth, set_current_user } = useContext(GlobalContext);
    let [progress_data, set_progress_data] = useState({ name: "", email: "", number: "" })

    const login_success = (user) => {
        set_current_user(user);
        setAuth(true);
        localStorage.setItem("current_user", JSON.stringify(user));
        localStorage.setItem("isAuth", true);
        navigate("/");
        set_process_index(0);
        set_progress_data({ name: "", email: "", number: "" })
    }

    const process_paths = [
        <Login
            set_process_index={set_process_index}
            progress_data={progress_data}
            set_progress_data={set_progress_data}
        />,
        <Otp
            set_process_index={set_process_index}
            progress_data={progress_data}
        />,
        <Register
            set_process_index={set_process_index}
            progress_data={progress_data}
        />
    ]

    useEffect(() => {
        set_isLoginPage(true);
        return () => set_isLoginPage(false);
    }, []);

    return (
        <Flex>
            <Box as='aside' width='45%' height='100vh' >
                <Image src='https://media.sugarcosmetics.com/upload/authSIe2.jpg' width='100%' height='100%' alt='Dan Abramov' />
            </Box>
            <Flex
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                width='70%'
                bg='grey.200'
                backgroundImage="url('https://media.sugarcosmetics.com/upload/loginPageBackGroundTexture.png')"
            >
                {process_paths[process_index]}
            </Flex>
        </Flex>
    )
}

export { Loginpage }