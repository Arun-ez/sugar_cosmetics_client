
import { useRef, useState } from 'react'
import { Heading, Input, Text, Button, Image } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST } from '../../redux/auth/action_types';
import { toast } from 'react-toastify';

const Login = ({ set_process_index, progress_data, set_progress_data }) => {

    let email_ref = useRef();
    let dispatch = useDispatch();
    const [loading, set_loading] = useState(false);

    let auth_data = useSelector((store) => {
        return store.AuthReducer;
    })

    const send_otp = async (email) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/otp/send`, {
                method: 'POST',
                body: JSON.stringify({ email: email }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let data = await response.json();
            set_progress_data({ ...progress_data, email, hashkey: data.hashkey });
            set_process_index(1);
            toast.success('OTP Sent');

        } catch (error) {
            toast.success('Please try agin later');
        }
    }

    const handle = async () => {

        const { value } = email_ref.current;

        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if (!valid) {
            toast.error('Invalid Email');
            return;
        }

        set_loading(true);
        await send_otp(value);
        set_loading(false);
    }

    return (
        <>
            <Image src='https://media.sugarcosmetics.com/upload/Hi!.png' width='150px' height='100px' alt='Dan Abramov' />
            <Heading as='h5' fontSize='20px' margin='14px' > Login/Sign Up Using Email </Heading>
            <Input
                type='email'
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                placeholder='Enter Your Email'
                width={['80%', '80%', '50%', '50%']}
                height='60px'
                border='1px solid grey'
                ref={email_ref}
                _focusVisible={false}
            />
            <Text
                margin='24px'
                fontSize='14px'
                color='grey'
                textAlign='center'
            >
                Registering for this site allows you to access your order status and history. Just fill in the above fields, and we'll get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.
            </Text>
            <Button isLoading={loading} bg='black' color='white' marginTop='36px' onClick={handle} _hover={'none'} > Proceed </Button>
        </>
    )
}

export { Login }
