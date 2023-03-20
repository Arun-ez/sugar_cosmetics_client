import "./Home.css"
import { useState } from 'react'
import { Flex, Heading, Image, Button, Box, useToast } from "@chakra-ui/react"
import { FiHeart } from "react-icons/fi"
import { HiHeart } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

const Card = ({ product, load }) => {

    const toast = useToast();
    let navigate = useNavigate();

    const [animate_display, set_animate_display] = useState("none");

    const add_wishlist = async () => {
        let response = await fetch(`https://rich-pink-anemone-tie.cyclic.app/products/${product.id}`, {
            method: "PATCH",
            body: JSON.stringify({ isListed: !product.isListed }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.status == 500) {
            load();

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
                            {product.isListed ? "Removed from wishlist" : "Added to wishlist."}

                        </Flex>

                    )
                }
            })
        }

    }

    const notify = (status) => {
        if (status == 500) {
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
                                Item Added Succesfully.
                            </Flex>

                        )
                    }
                })

                set_animate_display("none");

            }, 500)
        }
    }

    const post_request = async (qty) => {
        let response = await fetch("https://rich-pink-anemone-tie.cyclic.app/cart", {
            method: "POST",
            body: JSON.stringify({ ...product, qty: qty }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        notify(response.status);
    }

    const patch_request = async (qty) => {
        let response = await fetch(`https://rich-pink-anemone-tie.cyclic.app/cart/${product.id}`, {
            method: "PATCH",
            body: JSON.stringify({ qty: qty }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        notify(response.status);
    }

    const add_to_cart = async () => {

        set_animate_display("flex");

        fetch(`https://rich-pink-anemone-tie.cyclic.app/cart/${product.id}`)
            .then((res) => { return res.json() })
            .then((obj) => {
                if (obj.qty) {
                    patch_request(obj.qty + 1);
                } else {
                    post_request(1)
                }
            })
    }

    const goto_details = () => {
        navigate(`/products/${product.id}`)
    }

    return (
        <Flex w="100%" p="20px">
            <Flex bg="white" direction="column" p="30px" borderRadius="15px" justifyContent="space-around" alignItems="center" w="100%" boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px">
                <Image cursor="pointer" onClick={goto_details} src={product.images[0]} alt="thumbnail" h="220px" borderRadius="15px" />
                <p onClick={goto_details} style={{ fontSize: "12px", cursor: "pointer" }}> {product.Title} </p>

                <Flex cursor="pointer" onClick={goto_details} w="100%" justifyContent="center" alignItems="center" gap="10px">
                    <Heading as="h1" fontSize="20px"> ₹{product.Price} </Heading>
                    <Heading as="h1" fontSize="15px" color="#fc2779"> {product.brandcolor} </Heading>
                </Flex>
                <br />
                <Flex w="100%" justifyContent="center" alignItems="center" gap="15px">
                    <Button
                        variant="solid"
                        w="35px"
                        h="42px"
                        p="2"
                        bg="none"
                        border="1px solid black"
                        hover="none"
                        onClick={add_wishlist}
                        borderRadius="10px"> {product.isListed ? <HiHeart fontSize="25px" /> : <FiHeart fontSize="25px" />}  </Button>

                    <Flex direction="column" w="80%" pb="6px" h="47px" justifyContent="space-around" alignItems="center" bg="black" borderRadius="5px">
                        <Button
                            variant="ghost"
                            fontSize="15px"
                            colorScheme="black"
                            w="80%"
                            color="white"
                            hover="none"
                            onClick={add_to_cart}
                        > ADD TO BAG

                        </Button>

                        <Box display={animate_display} className='processing' h="4px" bg="#fc2779"></Box>
                    </Flex>

                </Flex>

            </Flex>

        </Flex>
    )
}

export { Card }
