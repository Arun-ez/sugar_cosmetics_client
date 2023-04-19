
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Flex, SimpleGrid, Image, Box, Heading, Text, Button } from "@chakra-ui/react"
import { Card } from '../Home/Card';
import batch from "./batch.svg"
import { GlobalContext } from '../../contexts/GlobalContextProvider';
import { BsWhatsapp } from "react-icons/bs"
import { FiShare2 } from "react-icons/fi"
import { MdOutlineContentCopy } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"
import { BiReceipt } from "react-icons/bi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { CiHeart } from "react-icons/ci"
import { BiGift } from "react-icons/bi"
import { SlBadge } from "react-icons/sl"
import "./WishList.css"
import empty from "./empty.png"
import { useSelector } from 'react-redux';

const WishList = () => {

    let [data, set_data] = useState([]);
    let user = useSelector((store) => {
        return store.AuthReducer.user;
    })
    let navigate = useNavigate();

    const load = async () => {
        try {
            let response = await fetch("https://rich-pink-anemone-tie.cyclic.app/products?isListed=true");
            let base = await response.json();
            set_data(base);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        document.title = "Sugar Cosmetics - Wishlist"
        window.scroll(0, 0);
        load();
    }, [])

    return (
        <Flex minH="900px" direction={["column", "column", "column", "row"]}>
            <Flex direction="column" alignItems="center" mt="20px" w={["100%", "100%", "100%", "35%"]}>
                <Flex
                    direction="column"
                    color="white"
                    w="80%"
                    p="10px"
                    h="300px" borderRadius="15px"
                    justifyContent="flex-start"
                    alignItems="center"
                    bgImage="https://media.sugarcosmetics.com/upload/VTOBackgroungTexture.png">
                    <Image w="100px" h="100px" src="https://media.sugarcosmetics.com/upload/accountMask.png" alt="user_logo" />
                    <Image w="30px" position="absolute" mt="85px" src={batch} alt="batch" />
                    <Heading as="h1" mt="20px" fontSize="16px"> {user.name} </Heading>
                    <Text mt="5px" fontSize="12px"> {user.email} </Text>
                    <Text mt="5px" fontSize="12px"> {user.number} </Text>
                </Flex>

                <Flex w="21%"
                    h="560px"
                    position="absolute"
                    borderRadius="15px"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
                    zIndex="1"
                    mt="270"
                    bg="white"
                    direction="column"
                    overflow="hidden"
                    display={["none", "none", "none", "flex"]}
                >
                    <Box whiteSpace="nowrap">
                        <Heading pl="20px" as="h1" mt="20px" fontSize="17px"> Refer Friends </Heading>
                        <Text pl="20px" opacity="80%"> Share your code and get up to ₹300 </Text>
                        <Flex gap="10px" mt="10px" pl="20px" pb="20px" borderBottom="1px solid #e3e3e3">
                            <Flex w="60%" h="50px" border="1px dashed #fc2779" borderRadius="10px" bg="#fff0f6">
                                <Flex h="100%" w="70%" justifyContent="center" alignItems="center">
                                    <Text> user2585 </Text>
                                </Flex>
                                <Flex h="100%" w="30%" borderLeft="1px dashed #fc2779" justifyContent="center" alignItems="center">
                                    <MdOutlineContentCopy />
                                </Flex>
                            </Flex>

                            <Flex bg="#25d366" borderRadius="10px" justifyContent="center" alignItems="center" w="50px" h="50px">
                                <BsWhatsapp style={{ color: "white" }} />
                            </Flex>
                            <Flex bg="#000000" borderRadius="10px" justifyContent="center" alignItems="center" w="50px" h="50px">
                                <FiShare2 style={{ color: "white", fontSize: "20px" }} />
                            </Flex>
                        </Flex>
                    </Box>

                    <Box whiteSpace="nowrap">
                        <NavLink className="side_nav_link" to="/">
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <BiReceipt style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="18px" fontWeight="medium"> Orders </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="/">
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <HiOutlineLocationMarker style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="18px" fontWeight="medium"> Addresses </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="/account/wishlist">
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <CiHeart style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="18px" fontWeight="medium"> Wishlist </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="/">
                            <Flex alignItems="center" gap="10px">
                                <Box display="flex" justifyContent="center" alignItems="center" w="40px" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <BsWhatsapp style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="18px" fontWeight="medium"> WhatsApp Store </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="/">
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <BiGift style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="18px" fontWeight="medium"> Refer & Earn </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="/">
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <SlBadge style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="18px" fontWeight="medium"> SUGAR FAM Rewards </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                            </Flex>
                        </NavLink>
                    </Box>

                </Flex>
            </Flex>

            <Flex w="100%" h={data.length <= 3 ? "100px" : "auto"} justifyContent="center">

                {data.length ?
                    <>
                        <SimpleGrid w="95%" columns={[1, 2, 2, 3]}>
                            {data.map((element, id) => {
                                return <Card load={load} product={element} key={id} />
                            })}
                        </SimpleGrid>
                    </>

                    :

                    <>
                        <Flex mt="50px" justifyContent="center" pb="55px" alignItems="flex-end" width="90%" borderRadius="15px" h="450px" bgImage={empty} bgPosition="center" boxShadow="0 .5rem 1rem rgba(0,0,0,.15)">
                            <Button
                                variant="ghost" p="22px" bg="black"
                                colorScheme="black" color="white"
                                onClick={() => { navigate("/") }}
                            > FILL IT UP </Button>
                        </Flex>
                    </>
                }

            </Flex>
        </Flex>
    )
}

export { WishList }
