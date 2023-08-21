import { Box, Image, Flex } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContextProvider';
import { Login } from './Login';
import { Otp } from './Otp';
import { Password } from './Password';
import { Register } from './Register';

const Authpage = () => {
    let [process_index, set_process_index] = useState(0);
    let { set_isLoginPage } = useContext(GlobalContext);
    let [progress_data, set_progress_data] = useState({ name: "", email: "", number: "", hashkey: "" })

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
        <Password
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
            <Box width='1200px' height='100vh' display={["none", "none", "none", "flex"]} >
                <Image src='https://media.sugarcosmetics.com/upload/authSIe2.jpg' width='100%' height='100%' alt='Dan Abramov' />
            </Box>
            <Flex
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                width='100%'
                h="100vh"
                bg='grey.200'
                backgroundImage="url('https://media.sugarcosmetics.com/upload/loginPageBackGroundTexture.png')"
            >
                {process_paths[process_index]}
            </Flex>
        </Flex>
    )
}

export { Authpage }