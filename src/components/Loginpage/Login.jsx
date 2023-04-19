
import { useRef } from 'react'
import { Heading, Input, Text, Button, Image } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST } from '../../redux/auth/action_types';

const Login = ({ set_process_index, progress_data, set_progress_data }) => {

    let email_ref = useRef();
    let dispatch = useDispatch();

    let auth_data = useSelector((store) => {
        return store.AuthReducer;
    })

    const handle = async () => {
        set_progress_data({ ...progress_data, email: email_ref.current.value })
        dispatch({ type: LOGIN_REQUEST, payload: { email: email_ref.current.value } });
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/exist`, {
                method: "POST",
                body: JSON.stringify({ email: email_ref.current.value }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let json = await response.json();

            if (json.result === true) {
                set_process_index(1);
            } else {
                set_process_index(2);
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <>
            <Image src='https://media.sugarcosmetics.com/upload/Hi!.png' width='150px' height='100px' alt='Dan Abramov' />
            <Heading as='h5' fontSize='20px' margin='14px' > Login/Sign Up Using Email </Heading>
            <Input
                type='tel'
                placeholder='Enter Your Email'
                width='400px'
                height='60px'
                border='1px solid grey'
                ref={email_ref}
            />
            <Text
                width='700px'
                margin='24px'
                fontSize='14px'
                color='grey'
                textAlign='center'
            >
                Registering for this site allows you to access your order status and history. Just fill in the above fields, and we'll get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.
            </Text>
            <Button bg='black' color='white' marginTop='36px' variant='ghost' onClick={handle} > Proceed </Button>
        </>
    )
}

export { Login }
