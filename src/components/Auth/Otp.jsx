import { HStack, VStack, PinInput, PinInputField, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { toast } from 'react-toastify';

const Otp = ({ set_process_index, progress_data }) => {

    const [otp, set_otp] = useState("");

    const verify = async () => {

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/otp/verify`, {
                method: 'POST',
                body: JSON.stringify({ email: progress_data.email, otp: Number(otp), hashkey: progress_data.hashkey }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let data = await response.json();

            if (data.error) {
                toast.error("Invalid OTP");
                return;
            }

            try {
                let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/exist`, {
                    method: "POST",
                    body: JSON.stringify({ email: progress_data.email }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                let json = await response.json();

                if (json.result === true) {
                    set_process_index(2);
                } else {
                    set_process_index(3);
                }
            } catch (error) {
                console.log(error.message);
            }

        } catch (error) {
            toast.success('Invalid OTP');
        }
    }

    return (
        <VStack justifyContent={'flex-start'} pb={40} gap={10}>
            <Text fontWeight={'medium'} fontSize={25}> Enter OTP </Text>
            <HStack gap={4} >
                <PinInput otp value={otp} size={['md', 'md', 'lg', 'lg']} onChange={(value) => { set_otp(value) }}>
                    <PinInputField borderColor={'blackAlpha.500'} _hover={'none'} _focus={{ borderColor: 'blackAlpha.700' }} _focusVisible={false} />
                    <PinInputField borderColor={'blackAlpha.500'} _hover={'none'} _focus={{ borderColor: 'blackAlpha.700' }} _focusVisible={false} />
                    <PinInputField borderColor={'blackAlpha.500'} _hover={'none'} _focus={{ borderColor: 'blackAlpha.700' }} _focusVisible={false} />
                    <PinInputField borderColor={'blackAlpha.500'} _hover={'none'} _focus={{ borderColor: 'blackAlpha.700' }} _focusVisible={false} />
                    <PinInputField borderColor={'blackAlpha.500'} _hover={'none'} _focus={{ borderColor: 'blackAlpha.700' }} _focusVisible={false} />
                    <PinInputField borderColor={'blackAlpha.500'} _hover={'none'} _focus={{ borderColor: 'blackAlpha.700' }} _focusVisible={false} />
                </PinInput>
            </HStack>

            <Button bg={'black'} _hover={'none'} color={'white'} onClick={verify} > Validate </Button>
        </VStack>
    )
}

export { Otp }
