import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flex, Image, Box, Heading, Text } from "@chakra-ui/react"
import { BsWhatsapp } from "react-icons/bs"
import { FiShare2 } from "react-icons/fi"
import { MdOutlineContentCopy } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"
import { BiReceipt } from "react-icons/bi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { CiHeart } from "react-icons/ci"
import { BiGift } from "react-icons/bi"
import "./AccountNavigator.css"

const AccountNavigator = ({ children }) => {

    let user = useSelector((store) => {
        return store.AuthReducer.user;
    })

    return (
        <Flex minH="900px" direction={["column", "column", "column", "row"]}>
            <Flex direction="column" alignItems="center" mt="20px" w={["100%", "100%", "100%", "35%"]} minW={["370px", "370px", "375px", "375px"]}>
                <Flex
                    direction="column"
                    color="white"
                    w={["92%", "92%", "92%", "85%"]}
                    p="10px"
                    h="220px" borderRadius="15px"
                    justifyContent="flex-start"
                    alignItems="center"
                    bgImage="https://media.sugarcosmetics.com/upload/VTOBackgroungTexture.png"
                    backgroundSize="100%"
                >
                    <Image w={24} h="100px" src="https://media.sugarcosmetics.com/upload/accountMask.png" alt="user_logo" />
                    <Image w="30px" position="absolute" mt="85px" src="/batch.svg" alt="batch" />
                    <Heading as="h1" mt="20px" fontSize="18px"> {user.name} </Heading>
                    <Text mt="5px" fontSize="14px"> {user.email} </Text>
                    <Text mt="5px" fontSize="12px"> {user.number} </Text>
                </Flex>

                <Flex w="22%"
                    minW="320px"
                    h="500px"
                    position="absolute"
                    borderRadius="15px"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
                    zIndex="1"
                    mt="200"
                    bg="white"
                    direction="column"
                    overflow="hidden"
                    display={["none", "none", "none", "flex"]}
                >
                    <Box whiteSpace="nowrap">
                        <Heading pl="20px" as="h1" mt="20px" fontSize="17px"> Refer Friends </Heading>
                        <Text pl="20px" opacity="80%"> Share your code and get up to ₹300 </Text>

                        <Flex justifyContent="space-around" mt="10px" pb="20px" borderBottom="1px solid #e3e3e3">
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
                        <NavLink className="side_nav_link" to="/account/orders">
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <BiReceipt style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="17px" fontWeight="500"> Orders </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "25px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="/account/addresses">
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <HiOutlineLocationMarker style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="17px" fontWeight="500"> Addresses </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "25px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="/account/wishlist">
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <CiHeart style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="17px" fontWeight="500"> Wishlist </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "25px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="https://api.whatsapp.com/send/?phone=919136922061&text=Hi&type=phone_number&app_absent=0" target='_blank'>
                            <Flex alignItems="center" gap="10px">
                                <Box display="flex" justifyContent="center" alignItems="center" w="40px" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <BsWhatsapp style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="17px" fontWeight="500"> WhatsApp Store </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "25px" }} />
                            </Flex>
                        </NavLink>

                        <NavLink className="side_nav_link" to="/account/refer" style={{ borderBottom: "none" }}>
                            <Flex alignItems="center" gap="10px">
                                <Box w="40px" display="flex" justifyContent="center" alignItems="center" h="40px" borderRadius="50%" border="1px solid #e3e3e3">
                                    <BiGift style={{ fontSize: "22px" }} />
                                </Box>

                                <Heading as="h1" fontSize="17px" fontWeight="500"> Refer & Earn </Heading>
                            </Flex>

                            <Flex>
                                <MdKeyboardArrowRight style={{ fontSize: "25px" }} />
                            </Flex>
                        </NavLink>
                    </Box>

                </Flex>
            </Flex>

            <Flex display={["flex", "flex", "flex", "none"]} className='menubar' w="90%" alignItems="center" gap="3%" m="20px auto" overflow="auto" whiteSpace="nowrap" boxSizing='border-box'>
                <NavLink to="/account/orders"> Orders </NavLink>
                <NavLink to="/account/addresses"> Addresses </NavLink>
                <NavLink to="/account/wishlist"> Wishlist </NavLink>
                <NavLink to="https://api.whatsapp.com/send/?phone=919136922061&text=Hi&type=phone_number&app_absent=0" target='_blank'> WhatsApp Store </NavLink>
                <NavLink to="/account/refer"> Refer & Earn </NavLink>
            </Flex>

            <Flex w="100%"> {children} </Flex>

        </Flex>
    )
}

export { AccountNavigator }
