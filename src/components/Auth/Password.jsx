import { Heading, Input, Text, Button, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_REQUEST } from '../../redux/auth/action_types';
import { native_login } from '../../redux/auth/actions';

const Password = ({ set_process_index, progress_data }) => {

    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const otp_validation = () => {
        const credentials = { email: progress_data.email, password: password }
        dispatch({ type: LOGIN_REQUEST, payload: credentials });
        dispatch(native_login);
    }


    return (

        <>
            <Image src='https://media.sugarcosmetics.com/upload/Hi!.png' width='150px' height='100px' alt='Dan Abramov' />
            <Heading as='h5' fontSize='20px' margin='14px' > Enter Password </Heading>
            <Input type='text' placeholder='Enter Password' width={['80%', '80%', '50%', '50%']} height='60px' border='1px solid grey' onChange={(e) => { setPassword(e.target.value) }} />
            <Text margin='24px' fontSize='14px' color='grey' textAlign='center' >Registering for this site allows you to access your order status and history. Just fill in the above fields, and we'll get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.</Text>
            <Button bg='black' color='white' marginTop='36px' variant='ghost' onClick={otp_validation} > Login </Button>
        </>
    )
}

export { Password }