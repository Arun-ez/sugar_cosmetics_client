import "./Home.css"
import { useState } from 'react'
import { Flex, Heading, Image, Button, Box, useToast } from "@chakra-ui/react"
import { FiHeart } from "react-icons/fi"
import { HiHeart } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Card = ({ product, category }) => {

    const toast = useToast();
    const navigate = useNavigate();
    const [animate_display, set_animate_display] = useState("none");

    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const notify = (message) => {
        setTimeout(() => {
            toast({
                position: "bottom-left",
                duration: 1000,
                isClosable: true,
                render: () => {
                    return (
                        <Flex w="250px"
                            h="70px"
                            alignItems="center"
                            borderRadius="4px"
                            fontSize="17px"
                            fontWeight="medium"
                            direction="column"
                            justifyContent="center"
                            color='white'
                            bg='#121212'
                        >
                            {message}
                        </Flex>

                    )
                }
            })

            set_animate_display("none");

        }, 500)
    }

    const add_wishlist = async () => {

    }

    const add_to_cart = async () => {


        if (!token) {
            navigate("/account");
            return;
        }

        set_animate_display("flex");

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart`, {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                notify("Item Added Succesfully.");
            } else {
                notify("Failed to add");
            }


        } catch (error) {
            notify("Failed to add");
        }
    }

    const goto_details = () => {
        navigate(`/products/${category}/${product._id}`);
    }

    return (
        <Flex w={["85%", "100%", "100%", "100%"]} p={["5px", "10px", "20px", "20px"]} justifySelf="center">
            <Flex
                bg="white"
                direction="column"
                p={["5px", "15px", "20px", "30px"]}
                borderRadius="15px"
                alignItems="center"
                justifyContent="space-evenly"
                w="100%"
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
            >
                <Image cursor="pointer" onClick={goto_details} src={product.images[0]} alt="thumbnail" h={["190px", "220px", "220px", "220px"]} borderRadius="15px" />
                <br />
                <p onClick={goto_details} style={{ fontSize: "12px", cursor: "pointer" }}> {product.Title} </p>

                <Flex cursor="pointer" mt="10px" onClick={goto_details} w="100%" justifyContent="center" alignItems="center" gap="10px">
                    <Heading as="h1" fontSize="20px"> ₹{product.price} </Heading>
                    <Heading as="h1" fontSize="15px" color="#fc2779"> {product.brandcolor} </Heading>
                </Flex>


                <Flex mt="20px" w="100%" justifyContent="center" alignItems="center" gap="13px">
                    <Button
                        variant="solid"
                        w="33px"
                        h="40px"
                        p="2"
                        bg="none"
                        border="1px solid black"
                        hover="none"
                        onClick={add_wishlist}
                        borderRadius="10px"> {product.isListed ? <HiHeart fontSize="23px" /> : <FiHeart fontSize="23px" />}
                    </Button>

                    <Flex direction="column" w={["60%", "60%", "70%", "80%"]} pb="6px" h="47px" justifyContent="space-around" alignItems="center" bg="black" borderRadius="5px">
                        <Button
                            variant="ghost"
                            fontSize={["12px", "12px", "12px", "14px"]}
                            colorScheme="black"
                            w="100%"
                            color="white"
                            hover="none"
                            onClick={add_to_cart}
                        > ADD TO BAG

                        </Button>

                        <Box display={animate_display} className='processing' h="3px" bg="#fc2779"></Box>
                    </Flex>

                </Flex>

            </Flex>

        </Flex>
    )
}

export { Card }
