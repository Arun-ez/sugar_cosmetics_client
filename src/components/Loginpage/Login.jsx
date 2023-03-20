
import { useRef } from 'react'
import { Heading, Input, Text, Button, Image } from '@chakra-ui/react'

const Login = ({ set_process_index, progress_data, set_progress_data }) => {

    let num_ref = useRef();

    const handle = () => {
        set_progress_data({ ...progress_data, number: num_ref.current.value })
        set_process_index(1);
    }

    return (
        <>
            <Image src='https://media.sugarcosmetics.com/upload/Hi!.png' width='150px' height='100px' alt='Dan Abramov' />
            <Heading as='h5' fontSize='20px' margin='14px' >Login/Sign Up Using Phone</Heading>
            <Input
                type='tel'
                placeholder='Enter phone number'
                width='400px'
                height='60px'
                border='1px solid grey'
                ref={num_ref}
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
            <Button bg='black' color='white' marginTop='36px' variant='ghost' onClick={handle} > SEND ME OTP </Button>
        </>
    )
}

export { Login }
