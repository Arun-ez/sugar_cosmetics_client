import { Heading, Input, Text, Button, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Otp = ({ set_process_index, progress_data, login_success }) => {
    const [input, setInput] = useState('');
    let navigate = useNavigate();

    const auth_validation = async () => {
        try {
            let response = await fetch(`https://rich-pink-anemone-tie.cyclic.app/users?number=${progress_data.number}`);
            let user = await response.json();

            if (user.length > 0) {
                login_success(user[0]);
            } else {
                set_process_index(2);
            }


        } catch (err) {
            console.log(err);
        }
    }

    const otp_validation = () => {
        if (input === '1234') {
            auth_validation();
        }
        else {
            alert("Wrong OTP");
        }
    }


    return (

        <>
            <Image src='https://media.sugarcosmetics.com/upload/Hi!.png' width='150px' height='100px' alt='Dan Abramov' />
            <Heading as='h5' fontSize='20px' margin='14px' >Login/Sign Up Using Phone</Heading>
            <Input type='tel' placeholder='Enter OTP' width='400px' height='60px' border='1px solid grey' onChange={(e) => { setInput(e.target.value) }} />
            <Text width='700px' margin='24px' fontSize='14px' color='grey' textAlign='center' >Registering for this site allows you to access your order status and history. Just fill in the above fields, and we'll get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.</Text>
            <Button bg='black' color='white' marginTop='36px' variant='ghost' onClick={otp_validation} >validate this</Button>
        </>
    )
}

export { Otp }