
import React, { useRef } from 'react'
import { Input, Button, Heading } from "@chakra-ui/react"

const Register = ({ set_process_index, progress_data }) => {

    let first_ref = useRef();
    let second_ref = useRef();
    let email_ref = useRef();

    const post_userdata = async (user) => {
        try {
            let response = await fetch(`https://rich-pink-anemone-tie.cyclic.app/users`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 500) {
                alert("Registration successful");
                set_process_index(0)
            } else {
                alert("Please try again later");
            }


        } catch (err) {
            alert("Please try again later");
        }
    }

    const register = () => {
        let name = first_ref.current.value + " " + second_ref.current.value;
        let email = email_ref.current.value;
        let user = { name, email, number: progress_data.number }
        post_userdata(user);
    }

    return (
        <>
            <Heading as='h5' fontSize='20px' margin='14px' > Please fill this form below </Heading>

            <Input
                type='text'
                placeholder='First Name'
                width='400px'
                height='60px'
                border='1px solid grey'
                ref={first_ref}
            />

            <br />

            <Input
                type='text'
                placeholder='Last Name'
                width='400px'
                height='60px'
                border='1px solid grey'
                ref={second_ref}
            />

            <br />

            <Input
                type='email'
                placeholder='Enter email id'
                width='400px'
                height='60px'
                border='1px solid grey'
                ref={email_ref}
            />
            <Button bg='black' color='white' marginTop='36px' variant='ghost' onClick={register} > SIGN ME UP </Button>
        </>
    )
}

export { Register }
