import "./Card.css";
import { useState } from 'react';
import { BarLoader } from 'react-spinners'
import { Flex, Heading, Image, Text, useConst } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";
import { HiHeart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Card = ({ product, status, reload }) => {

    const navigate = useNavigate();

    let [animate_button, set_animate_button] = useState(false);

    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const notify = (message) => {
        toast(message);
        setTimeout(() => {
            set_animate_button(false);
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
                reload(false);
            } else {
                notify("Failed to add");
            }

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
                reload(false);
            } else {
                notify("Failed to remove");
            }

        } catch (error) {
            notify("Failed to remove");
        }
    }

    const add_to_cart = async () => {


        if (!token) {
            navigate("/account");
            return;
        }

        set_animate_button(true);

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
            <Text fontWeight="medium" fontSize={["8px", "10px", "13px", "13px"]} cursor="pointer" onClick={goto_details} > {product.title.substring(0, 20) + "..."} </Text>

            <Flex cursor="pointer" mt="10px" onClick={goto_details} w="100%" justifyContent="center" alignItems="center" gap="10px">
                <Heading as="h1" fontSize={["12px", "15px", "17px", "17px"]}> ₹{product.price} </Heading>
                <Heading as="h1" fontSize={["8px", "10px", "12px", "12px"]} color="#fc2779"> {product.discount ? `( ${product.discount}% off )` : ``} </Heading>
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

                {product.inventory ? (
                    <Flex
                        color="white"
                        fontWeight="500"
                        gap="2px"
                        whiteSpace="nowrap"
                        fontSize={["10px", "13px", "13px", "13px"]}
                        direction="column"
                        w={["80%", "80%", "70%", "80%"]}
                        h={["35px", "45px", "45px", "45px"]}
                        justifyContent="center"
                        alignItems="center"
                        bg="black" borderRadius="5px"
                        cursor="pointer"
                        onClick={add_to_cart}
                    >

                        ADD TO BAG

                        <BarLoader color="#fc2779" loading={animate_button} className="loading" />

                    </Flex>
                ) : (
                    <Flex
                        fontWeight="bold"
                        gap="2px"
                        whiteSpace="nowrap"
                        fontSize={["10px", "13px", "15px", "15px"]}
                        direction="column"
                        w={["80%", "80%", "70%", "80%"]}
                        h={["35px", "45px", "45px", "45px"]}
                        justifyContent="center"
                        alignItems="center"
                        border="2px solid black" borderRadius="5px"
                        cursor="pointer"
                        onClick={() => { notify('You will be notified on availability') }}
                    >
                        Notify Me
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export { Card }
