
import { useContext } from 'react'
import { Flex, Input, Button, Heading, Box, Image, SimpleGrid } from "@chakra-ui/react"
import footer_bg from "./footer_top_bg.svg";
import footer_icon from "./footer_sugar_icon.png"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import { AiFillMail } from "react-icons/ai"
import { FaFacebookF, FaTumblr, FaYoutube, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa"
import { GlobalContext } from '../../contexts/GlobalContextProvider';

const Footer = () => {

    let { isLoginPage } = useContext(GlobalContext);

    return (

        <>
            <Flex display={isLoginPage ? "none" : "flex"} h="70px" w="98%" justifyContent="left" gap="15px" alignItems="center" fontWeight="medium" borderTop="2px solid #f2f2f2" m="auto">
                <p> READ MORE ABOUT SUGAR COSMETICS </p>
                <MdOutlineArrowForwardIos color='#fc2779' fontSize="18px" />
            </Flex>

            <Flex display={isLoginPage ? "none" : "flex"} className='footer' direction="column" alignItems="center" position="relative">

                <Flex bg={`url(${footer_bg})`} h="300px" w="100%" direction="column" alignItems="center" bgRepeat="no-repeat" backgroundSize="cover" position="absolute">

                    <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" whiteSpace="nowrap">
                        <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                        <Heading as="h2" fontSize={["20px", "25px", "25px", "25px"]}> LET’S STAY IN TOUCH </Heading>
                        <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                    </Flex>

                    <Flex h="40px" justifyContent="center" alignItems="center" pb="20px" whiteSpace={["normal", "nowrap", "nowrap", "nowrap"]} fontSize={["12px", "14px", "15px", "15px"]}>
                        <p style={{ textAlign: "center" }}> Get the latest beauty tips straight to your inbox. Can’t wait to connect! </p>
                    </Flex>

                    <Flex w={["80%", "80%", "60%", "40%"]} h="45px" border="1px solid gray" borderRadius="8px" overflow="hidden">
                        <Input
                            placeholder='Enter Email'
                            border="none"
                            _focusVisible={false}
                            borderRadius="none"
                            bg="white"
                            color="black"
                            style={{ caretColor: "#fc2779" }}
                            h="100%"
                        />

                        <Button borderRadius="0px" variant="ghost" colorScheme="black" h="100%" pl="40px" pr="40px" bg="black" color="white"> SUBSCRIBE </Button>
                    </Flex>
                </Flex>

                <Flex direction="column" bg="#000000" w="100%" alignItems="center">
                    <Flex h="100px" w="100%" justifyContent="center" zIndex="1" mt="230px">
                        <Box w="130px" h="130px" p="20px" bg="#000000" borderRadius="50%">
                            <Image src={footer_icon} w="100%" />
                        </Box>
                    </Flex>
                    <Flex h="80px" mt="60px" fontSize="17px" color="black" justifyContent="center" alignItems="center" gap="20px">
                        <Flex w={["25px", "30px", "30px", "30px"]}
                            h={["25px", "30px", "30px", "30px"]}
                            borderRadius="50%"
                            bg="#999999"
                            justifyContent="center"
                            alignItems="center"
                            _hover={{ background: 'white' }}
                            cursor="pointer"
                            onClick={() => { window.open("https://www.facebook.com/trySUGAR/") }}> <FaFacebookF />
                        </Flex>

                        <Flex w={["25px", "30px", "30px", "30px"]}
                            h={["25px", "30px", "30px", "30px"]}
                            borderRadius="50%"
                            bg="#999999"
                            justifyContent="center"
                            alignItems="center"
                            _hover={{ background: 'white' }}
                            cursor="pointer"
                            onClick={() => { window.open("https://www.tumblr.com/sugarcosmetics-blog") }}> <FaTumblr />
                        </Flex>

                        <Flex w={["25px", "30px", "30px", "30px"]}
                            h={["25px", "30px", "30px", "30px"]}
                            borderRadius="50%"
                            bg="#999999"
                            justifyContent="center"
                            alignItems="center"
                            _hover={{ background: 'white' }}
                            cursor="pointer"
                            onClick={() => { window.open("https://www.youtube.com/channel/UCKVqnev2idvmUNKc2b91B8g") }}
                        > <FaYoutube />
                        </Flex>

                        <Flex w={["25px", "30px", "30px", "30px"]}
                            h={["25px", "30px", "30px", "30px"]}
                            borderRadius="50%"
                            bg="#999999"
                            justifyContent="center"
                            alignItems="center"
                            _hover={{ background: 'white' }}
                            cursor="pointer"
                            onClick={() => { window.open("https://twitter.com/trySUGAR") }}> <FaTwitter /> </Flex>


                        <Flex w={["25px", "30px", "30px", "30px"]}
                            h={["25px", "30px", "30px", "30px"]}
                            borderRadius="50%"
                            bg="#999999"
                            justifyContent="center"
                            alignItems="center"
                            _hover={{ background: 'white' }}
                            cursor="pointer"
                            onClick={() => { window.open("https://www.instagram.com/trysugar/?hl=en") }}> <FaInstagram
                            /> </Flex>

                        <Flex w={["25px", "30px", "30px", "30px"]}
                            h={["25px", "30px", "30px", "30px"]}
                            borderRadius="50%"
                            bg="#999999"
                            justifyContent="center"
                            alignItems="center"
                            _hover={{ background: 'white' }}
                            cursor="pointer"
                            onClick={() => { window.open("mailto:?subject=Check%20this%20https://in.sugarcosmetics.com/pages/offer") }}
                        > <AiFillMail />
                        </Flex>
                        <Flex w={["25px", "30px", "30px", "30px"]}
                            h={["25px", "30px", "30px", "30px"]}
                            borderRadius="50%"
                            bg="#999999"
                            justifyContent="center"
                            alignItems="center"
                            _hover={{ background: 'white' }}
                            cursor="pointer"
                            onClick={() => { window.open("https://in.pinterest.com/sugarcosmetics/") }}> <FaPinterestP
                            /> </Flex>

                    </Flex>
                    <Flex justifyContent={["space-around", "space-around", "space-around", "center"]} gap={["10px", "10px", "0px", "100px"]} w="94%" h="80px" alignItems="center" borderTop="1px solid #c4c4c4" borderBottom="1px solid #c4c4c4" whiteSpace="nowrap">
                        <Heading as="h1" fontSize={["11px", "15px", "18px", "18px"]} color="white" cursor="pointer" _hover={{ textDecoration: "underline" }}> Stores </Heading>
                        <Heading as="h1" fontSize={["11px", "15px", "18px", "18px"]} color="white" cursor="pointer" _hover={{ textDecoration: "underline" }}> Terms & Conditions </Heading>
                        <Heading as="h1" fontSize={["11px", "15px", "18px", "18px"]} color="white" cursor="pointer" _hover={{ textDecoration: "underline" }}> Returns </Heading>
                        <Heading as="h1" fontSize={["11px", "15px", "18px", "18px"]} color="white" cursor="pointer" _hover={{ textDecoration: "underline" }}> FAQs </Heading>
                        <Heading as="h1" fontSize={["11px", "15px", "18px", "18px"]} color="white" cursor="pointer" _hover={{ textDecoration: "underline" }}> About Us </Heading>
                    </Flex>
                    <Flex direction="column" color="white" borderBottom="1px solid #c4c4c4" w="94%">

                        <Flex w="100%" h="80px" alignItems="center" pl="100px">
                            <Heading as="h2" fontSize="22px"> GET IN TOUCH </Heading>
                        </Flex>

                        <SimpleGrid columns={[1, 2, 3, 5]} spacing={10} pb="30px" mt="30px">
                            <Flex direction="column">
                                <Heading as="h2" size="md"> Call us at </Heading>
                                <br />
                                <Heading as="h2" size="sm" opacity="50%" cursor="pointer" _hover={{ textDecoration: "underline" }}> 1800-209-9933 </Heading>
                                <Heading as="h2" size="sm" opacity="50%" mt="5px"> Monday to Friday : 9 AM to 7 PM  </Heading>
                            </Flex>

                            <Flex direction="column">
                                <Heading as="h2" size="md"> Support </Heading>
                                <Heading as="h2" size="sm" opacity="50%" mt="3px" cursor="pointer" _hover={{ textDecoration: "underline" }}> hello@sugarcosmetics.com </Heading>
                            </Flex>

                            <Flex direction="column">
                                <Heading as="h2" size="md"> Careers </Heading>
                                <Heading as="h2" size="sm" opacity="50%" mt="3px" cursor="pointer" _hover={{ textDecoration: "underline" }}> We're hiring! </Heading>
                            </Flex>

                            <Flex direction="column">
                                <Heading as="h2" size="md"> Press & Media </Heading>
                                <Heading as="h2" size="sm" opacity="50%" mt="5px" cursor="pointer" _hover={{ textDecoration: "underline" }}> pr@sugarcosmetics.com </Heading>
                            </Flex>

                            <Flex direction="column">
                                <Heading as="h2" size="md"> Influencer Collab </Heading>
                                <Heading as="h2" size="sm" opacity="50%" mt="5px" cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => { window.open("https://docs.google.com/forms/d/10QqWLG-_x61g8xXcCOd856iap1feiMgFmWcXhVxDWk0/viewform?edit_requested=true") }}> Join Us </Heading>
                            </Flex>
                        </SimpleGrid>

                    </Flex>

                    <Flex color="white" gap={["0px", "20px", "20px", "20px"]} pt={["20px", "0px", "0px", "0px"]} alignItems="center" direction={["column", "row", "row", "row"]}>
                        <Flex direction="column">
                            <Heading as="h2" fontSize={["12px", "14px", "20px", "20px"]}> GET THE NEW SUGAR APP TODAY! </Heading>
                            <Heading as="h2" size="sm" opacity="50%" mt="5px" fontSize={["10px", "11px", "12px", "12px"]} fontWeight="medium"> Tap into a better shopping experience. </Heading>
                        </Flex>
                        <Flex justifyContent="center" alignItems="center" gap="10px" h="80px">
                            <Image src='https://in.sugarcosmetics.com/playstore.png' cursor="pointer" onClick={() => { window.open("https://play.google.com/store/apps/details?id=com.app.sugarcosmetics") }} h={["30%", "40%", "50%", "50%"]} alt='playstore' />
                            <Image src='https://in.sugarcosmetics.com/apple-store.png' cursor="pointer" onClick={() => { window.open("https://apps.apple.com/app/id1476501793") }} h={["30%", "40%", "50%", "50%"]} alt='appstore' />
                        </Flex>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center" borderTop="1px solid #c4c4c4" color="white" w="100%" h="50px" opacity="60%" fontSize="14px">
                        <p> Copyright © 2023 SUGAR Cosmetics. All rights reserved. </p>
                    </Flex>
                </Flex>
            </Flex >
        </>


    )
}

export default Footer;
