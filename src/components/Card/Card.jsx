import "./Card.css"
import { useState } from 'react'
import { Flex, Heading, Image, Button, Box, Text, useToast } from "@chakra-ui/react"
import { FiHeart } from "react-icons/fi"
import { HiHeart } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { sort_and_filter_handler, get_wishlist } from "../../redux/products/actions"

const Card = ({ product, status }) => {

    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        if (!token) {
            navigate("/account");
            return;
        }

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wishlist`, {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                notify("Item Added to Wishlist");
            } else {
                notify("Failed to add");
            }

            dispatch(sort_and_filter_handler);
            dispatch(get_wishlist);

        } catch (error) {
            notify("Failed to add");
        }
    }

    const remove_wishlist = async () => {
        if (!token) {
            navigate("/account");
            return;
        }

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wishlist/${product._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                notify("Item Removed from Wishlist");
            } else {
                notify("Failed to remove");
            }

            dispatch(sort_and_filter_handler);
            dispatch(get_wishlist);

        } catch (error) {
            notify("Failed to remove");
        }
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

        setTimeout(() => {
            set_animate_display("none");
        }, 700)
    }

    const goto_details = () => {
        navigate(`/collections/${product.category}/${product._id}`);
    }

    return (

        <Flex
            bg="white"
            direction="column"
            p={["15px", "15px", "20px", "30px"]}
            borderRadius="15px"
            alignItems="center"
            justifyContent="space-evenly"
            w="100%"
            boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        >



            <Image cursor="pointer" onClick={goto_details} src={product.images[0]} alt="thumbnail" h={["150px", "220px", "220px", "220px"]} borderRadius="15px" />
            <br />
            <Text fontWeight="medium" fontSize={["8px", "10px", "13px", "13px"]} cursor="pointer" onClick={goto_details} > {product.Title.substring(0, 20) + "..."} </Text>

            <Flex cursor="pointer" mt="10px" onClick={goto_details} w="100%" justifyContent="center" alignItems="center" gap="10px">
                <Heading as="h1" fontSize={["12px", "15px", "17px", "17px"]}> ₹{product.price} </Heading>
                <Heading as="h1" fontSize={["8px", "10px", "12px", "12px"]} color="#fc2779"> {product.brandcolor} </Heading>
            </Flex>


            <Flex mt="20px" w="100%" justifyContent="space-between" alignItems="center" gap="5px">
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    w={["32px", "38px", "45px", "45px"]}
                    h={["32px", "38px", "45px", "45px"]}
                    bg="none"
                    border="1px solid black"
                    hover="none"
                    cursor="pointer"
                    onClick={status === true ? remove_wishlist : add_wishlist}
                    borderRadius="10px"> {status === true ? <HiHeart fontSize="21px" /> : <FiHeart fontSize="21px" />}
                </Flex>

                <Flex direction="column" w={["60%", "60%", "70%", "80%"]} pb="6px" h={["35px", "40px", "47px", "47px"]} justifyContent="space-around" alignItems="center" bg="black" borderRadius="5px">
                    <Button
                        variant="ghost"
                        fontSize={["8px", "10px", "14px", "14px"]}
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
    )
}

export { Card }
