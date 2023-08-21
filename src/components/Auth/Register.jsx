
import React, { useEffect, useRef } from 'react'
import { Input, Button, Heading } from "@chakra-ui/react";
import { SIGNUP_REQUEST } from '../../redux/auth/action_types';
import { signup_request } from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';

const Register = ({ set_process_index, progress_data }) => {

    let first_ref = useRef();
    let second_ref = useRef();
    let email_ref = useRef();
    let password_ref = useRef();
    const dispatch = useDispatch();

    let auth_data = useSelector((store) => {
        return store.AuthReducer;
    })

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
        let email = progress_data.email;
        let password = password_ref.current.value;
        dispatch({ type: SIGNUP_REQUEST, payload: { name, email, password } });
        dispatch(signup_request);
    }

    useEffect(() => {

        if (auth_data.signupStatus === true) {
            set_process_index(0);
        }

    }, [auth_data])

    return (
        <>
            <Heading as='h5' fontSize='20px' margin='14px' > Please fill this form below </Heading>

            <Input
                type='text'
                placeholder='First Name'
                width={['80%', '80%', '50%', '50%']}
                height='60px'
                border='1px solid grey'
                ref={first_ref}
            />

            <br />

            <Input
                type='text'
                placeholder='Last Name'
                width={['80%', '80%', '50%', '50%']}
                height='60px'
                border='1px solid grey'
                ref={second_ref}
            />

            <br />

            <Input
                type='email'
                placeholder='Enter new Password'
                width={['80%', '80%', '50%', '50%']}
                height='60px'
                border='1px solid grey'
                ref={password_ref}
            />
            <Button bg='black' color='white' marginTop='36px' variant='ghost' onClick={register} > SIGN ME UP </Button>
        </>
    )
}

export { Register }
