import { BarLoader } from 'react-spinners'
import { useContext, useEffect, useState } from 'react'
import {
    Flex,
    Text,
    Heading,
    Image,
    Box,
    Button,
    Input,
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
} from '@chakra-ui/react';
import { MdArrowForwardIos } from "react-icons/md"
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillStar } from "react-icons/ai"
import { FiHeart } from "react-icons/fi"
import { HiHeart } from "react-icons/hi"
import { GiRabbit } from "react-icons/gi"
import { TbTruckReturn } from "react-icons/tb"
import { HiOutlineBadgeCheck } from "react-icons/hi"
import { GrStar } from "react-icons/gr"
import { CardCarousel } from '../CardCarousel/CardCarousel'
import { ViewfinderSkeleton } from '../Skeletons/ViewfinderSkeleton';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../contexts/GlobalContextProvider'

const ViewFinder = () => {

    const { static_data } = useContext(GlobalContext);

    let navigate = useNavigate();
    let { id } = useParams();
    let [status, set_status] = useState(false);
    let [product, set_product] = useState(null);
    let [active_index, set_active_index] = useState(0);
    let [window_width, set_window_width] = useState(0);

    let [animate_button, set_animate_button] = useState(false);

    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    useEffect(() => {

        const action = () => {
            set_window_width(window.innerWidth);
        }

        window.addEventListener("resize", action)

        return () => window.removeEventListener('resize', action);

    }, [])

    const load = async (shouldClear) => {

        if (shouldClear) {
            set_product(null);
        }

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/${id}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token || ''}`
                }
            });

            let { data, wishlist } = await response.json();
            set_status(wishlist);
            document.title = data.title;
            set_product(data);
        } catch (error) {
            console.log(error);
        }
    }



    const get_starts = () => {
        let arr = [];
        for (let i = 0; i < Math.floor(product.rating); i++) {
            arr.push(<GrStar style={{ fontSize: "18px" }} key={i} />)
        }

        return arr;
    }

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
                load();
                notify("Item Added to Wishlist");
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
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wishlist/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                load();
                notify("Item Removed from Wishlist");
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


    useEffect(() => {
        window.scroll(0, 0);
        set_window_width(window.innerWidth);
        load(true);
        return () => { window.scroll(0, 0) }
    }, [id])

    return (
        <>
            <Flex direction="column" w="100%" alignItems="center" minH="70vh">

                {product ? (
                    <>

                        <Flex w="100%" pl="20px" h="50px" alignItems="center" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px" gap="10px">
                            <Text opacity="70%" cursor="pointer" onClick={() => { navigate("/") }}> Home </Text>
                            <MdArrowForwardIos style={{ opacity: "60%", fontSize: "15px" }} />
                            <Heading as="h1" fontSize={["14px", "15px", "16px", "16px"]}> {product.title} </Heading>
                        </Flex>

                        <Flex
                            w={["100%", "100%", "90%", "85%"]}
                            direction={["column", "column", "column", "row"]}
                            gap="20px"
                            alignItems={["center", "center", "center", "start"]}
                            p="20px" m="20px auto" minH="70vh"
                            borderRadius="12px"
                            boxShadow={["none", "none", "0 .5rem 1rem rgba(0,0,0,.15)", "0 .5rem 1rem rgba(0,0,0,.15)"]}
                        >

                            <Flex w="80%" direction={["column-reverse", "column-reverse", "row", "row"]}>

                                {/* Image wrapper */}
                                <Flex justifyContent="center" pt="10px" w={["100%", "100%", "120px", "120px"]} gap={["10px", "10px", "5px", "5px"]} alignItems="center" direction={["row", "row", "column", "column"]}>

                                    {
                                        product.images.map((element, index) => {
                                            return (
                                                <Image
                                                    padding="5px"
                                                    border={index === active_index ? "2px solid black" : "1px solid #e4e4e4"}
                                                    borderRadius="10px"
                                                    w={["50px", "50px", "70px", "70px"]}
                                                    h={["60px", "60px", "80px", "80px"]}
                                                    cursor="pointer"
                                                    key={index}
                                                    src={element} alt="image"
                                                    onMouseOver={() => { set_active_index(index) }}
                                                />
                                            )
                                        })
                                    }
                                </Flex>

                                <Flex w="100%" minW={["250px", "250px", "250px", "300px"]} pt="20px" justifyContent="center">
                                    <Image
                                        border="1px solid #e4e4e4"
                                        borderRadius="10px"
                                        p={["30px 50px 30px 50px", "30px 50px 30px 50px", "30px 70px 30px 70px", "30px 70px 30px 70px"]}
                                        w={["350px", "350px", "350px", "400px"]} h={["300px", "300px", "400px", "400px"]} src={product.images[active_index]} />
                                </Flex>
                            </Flex>


                            {/* Details wrapper */}
                            <Flex direction="column" gap="10px" pt="15px" w="100%" color="#212121">
                                <Heading as="h1" fontWeight="medium" fontSize="20px"> {product.title} </Heading>
                                <Text
                                    display="flex"
                                    fontWeight="medium"
                                    borderRadius="5px"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="5px"
                                    p="5px 25px 5px 20px"
                                    fontSize="14px"
                                    border="1px solid #bdbdbd"
                                    w="min-content"
                                > <AiFillStar /> {product.rating} </Text>

                                <Flex
                                    alignItems={(window_width > 991 && window_width <= 1230) || window_width < 600 ? "left" : "center"}
                                    direction={(window_width > 991 && window_width <= 1230) || window_width < 600 ? "column" : "row"}
                                    gap={(window_width > 991 && window_width <= 1230) || window_width < 600 ? "15px" : "30px"}
                                >
                                    <Flex alignItems="center" gap="10px">
                                        <Heading as="h1" fontWeight="bold" fontSize="20px"> {"₹" + product.price + ".00"} </Heading>
                                        <Heading as="h1" fontWeight="bold" opacity="90%" fontSize="13px" color="#fc2779"> {product.discount ? `( ${product.discount}% off )` : ``} </Heading>
                                    </Flex>

                                    <Flex alignItems="center" gap="10px">
                                        <Box whiteSpace="nowrap" color="White" bg="#2d8c00" fontSize="12px" fontWeight="medium" pl="4px" pr="4px" borderRadius="5px"> FREE SHIPPING </Box>
                                        <Text whiteSpace="nowrap" fontStyle="italic" fontSize="9px" opacity="70%"> (T&C applicable) </Text>
                                    </Flex>

                                </Flex>
                                <Flex bg="#f7f7f7" flexDirection="column" mt="10px" gap="10px" borderRadius="12px" justifyContent="center" p="15px">
                                    <Heading as="h1" opacity="95%" fontWeight="bold" fontSize="14px"> AVAILABLE OFFERS!! </Heading>
                                    <ul style={{ fontSize: "14px", marginLeft: "17px" }}>
                                        <li> {product.offers[0]} </li>
                                        <Text fontWeight="bold" textDecoration="underline"> Know More </Text>
                                        <br />
                                        <li> {product.offers[1]} </li>
                                        <Text fontWeight="bold" textDecoration="underline"> Know More </Text>
                                    </ul>
                                </Flex>

                                <Flex w="100%" justifyContent="left" pb="15px" alignItems="center" gap="15px" borderBottom="1px dashed #bdbdbd">
                                    <Button
                                        variant="solid"
                                        w="45px"
                                        h="45px"
                                        p="2"
                                        bg="none"
                                        border="1px solid black"
                                        hover="none"
                                        onClick={status === true ? remove_wishlist : add_wishlist}
                                        borderRadius="10px"> {status === true ? <HiHeart fontSize="25px" /> : <FiHeart fontSize="25px" />}
                                    </Button>

                                    {product.inventory ? (
                                        <Flex
                                            direction="column"
                                            color="white"
                                            fontWeight="500"
                                            w="230px"
                                            h="50px"
                                            justifyContent="center"
                                            alignItems="center"
                                            bg="black"
                                            borderRadius="5px"
                                            onClick={add_to_cart}
                                            cursor="pointer"
                                            fontSize={18}
                                        >

                                            ADD TO BAG

                                            <BarLoader color="#fc2779" loading={animate_button} />

                                        </Flex>
                                    ) : (
                                        <Flex
                                            direction="column"
                                            fontWeight="bold"
                                            w="230px"
                                            h="50px"
                                            justifyContent="center"
                                            alignItems="center"
                                            border="1px solid black"
                                            borderRadius="5px"
                                            onClick={() => { notify("You will be notified on availability") }}
                                            cursor="pointer"
                                            fontSize={18}
                                        >

                                            Notify Me

                                            <BarLoader color="#fc2779" loading={animate_button} />

                                        </Flex>
                                    )}


                                </Flex>

                                <Flex w="100%" gap="10px" mt="15px">
                                    <Input h="45px" focusBorderColor='black' w="40%" placeholder='Enter Delivery Pincode' />
                                    <Button pl="30px" pr="30px" h="45px" variant="ghost" bg="black" colorScheme="black" color="white" hover={{ color: "black" }}> CHECK </Button>
                                </Flex>

                                <Flex pl="10px" h="50px"
                                    alignItems="center" gap="4%"
                                    fontSize="12px" fontWeight="medium"
                                    bg="#f7f7f7" borderTop="1px dashed #bdbdbd" borderBottom="1px dashed #bdbdbd">
                                    <Text display="flex" alignItems="center" gap="4px"> <GiRabbit style={{ fontSize: "14px" }} /> Cruelty Free </Text>
                                    <Text display="flex" alignItems="center" gap="4px"> <TbTruckReturn style={{ fontSize: "16px" }} /> Easy return </Text>
                                    <Text display="flex" alignItems="center" gap="4px"> <HiOutlineBadgeCheck style={{ fontSize: "16px" }} /> Quality First </Text>
                                </Flex>

                                <Flex>
                                    <Accordion allowMultiple={true} w="100%">
                                        <AccordionItem borderTop="none" borderBottom="1px dashed #bdbdbd" mt="10px">
                                            <h2 style={{ margin: "5px 0px 5px 0px" }}>
                                                <AccordionButton display="flex" justifyContent="space-between">
                                                    <Box fontWeight="bold" fontSize="14px"> DESCRIPTION </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>

                                            <AccordionPanel fontSize="13px">
                                                <Text> {product.description} </Text>
                                                <br />
                                                <p>
                                                    <span style={{ fontSize: "14px", fontWeight: "bold" }}> Benifits: </span>
                                                    Enriched with lavender & chamomile extract for distressed skin relief, aloe vera & fruit acids for skin brightening, SUGAR Charcoal Patrol Bubble Mask is a treat for users as it deep cleanses, invigorates, purifies & oxygenates the skin. The generated micro-bubbles dissolve away makeup impurities & help in pore care. Infused with charcoal to exfoliate dead skin, green tea to provide UV protection & grapefruit extract for detoxification, this mask is in the A-list for all.
                                                </p>

                                                <ul style={{ marginLeft: "15px", marginTop: "10px" }}>
                                                    <li> {product.benifits[0]} </li>
                                                    <li> {product.benifits[1]} </li>
                                                    <li> {product.benifits[2]} </li>
                                                </ul>

                                                <p style={{ marginTop: "20px" }}>
                                                    <span style={{ fontSize: "14px", fontWeight: "bold" }}> How to use: </span>
                                                    Wash your face and use a skin toner. Unseal the mask and apply it on your face. When exposed to air, the mask begins to bubble and foam. Keep the mask on for 15-20 minutes. Remove the mask by rinsing thoroughly.
                                                </p>

                                            </AccordionPanel>
                                        </AccordionItem>

                                        <AccordionItem borderTop="none" borderBottom="1px dashed #bdbdbd" mt="10px">
                                            <h2 style={{ margin: "5px 0px 5px 0px" }}>
                                                <AccordionButton display="flex" justifyContent="space-between">
                                                    <Box fontWeight="bold" fontSize="14px"> REVIEWS </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>

                                            <AccordionPanel>

                                                <Flex
                                                    w="100%"
                                                    minH="150px"
                                                    borderRadius="10px"
                                                    boxShadow="0 .5rem 1rem rgba(0,0,0,.15)"
                                                    justifyContent="center"
                                                >

                                                    <Flex w="40%" direction="column" justifyContent="center" alignItems="center">
                                                        <Heading as="h1" fontWeight="bold"> {product.rating} </Heading>
                                                        <Flex mt="10px" justifyContent="center">
                                                            {get_starts()}
                                                        </Flex>

                                                        <Text mt="5px" fontWeight="medium" fontSize="12px"> {product.reviews.length} REVIEWS </Text>
                                                    </Flex>

                                                    <Flex w="100%" gap="4px" direction="column" justifyContent="center" alignItems="center"
                                                        display={window_width < 1240 && window_width > 991 ? "none" : "flex"}>
                                                        <Flex alignItems="center" gap="5px" h="20px" w="90%">
                                                            <Text opacity="80%"> 5 </Text>
                                                            <GrStar style={{ fontSize: "20px", opacity: "80%" }} />
                                                            <Flex w="100%" bg="#f7f7f7" borderRadius="10px">
                                                                <Box bg="black" w="80%" h="7px" borderRadius="10px"> </Box>
                                                            </Flex>

                                                            <Text opacity="80%"> 109 </Text>
                                                        </Flex>

                                                        <Flex alignItems="center" gap="5px" h="20px" w="90%">
                                                            <Text opacity="80%"> 4 </Text>
                                                            <GrStar style={{ fontSize: "20px", opacity: "80%" }} />
                                                            <Flex w="100%" bg="#f7f7f7" borderRadius="10px">
                                                                <Box bg="black" w="60%" h="7px" borderRadius="10px"> </Box>
                                                            </Flex>

                                                            <Text opacity="80%"> 311 </Text>
                                                        </Flex>

                                                        <Flex alignItems="center" gap="5px" h="20px" w="90%">
                                                            <Text opacity="80%"> 3 </Text>
                                                            <GrStar style={{ fontSize: "20px", opacity: "80%" }} />
                                                            <Flex w="100%" bg="#f7f7f7" borderRadius="10px">
                                                                <Box bg="black" w="50%" h="7px" borderRadius="10px"> </Box>
                                                            </Flex>

                                                            <Text opacity="80%"> 90 </Text>
                                                        </Flex>

                                                        <Flex alignItems="center" gap="5px" h="20px" w="90%">
                                                            <Text opacity="80%"> 2 </Text>
                                                            <GrStar style={{ fontSize: "20px", opacity: "80%" }} />
                                                            <Flex w="100%" bg="#f7f7f7" borderRadius="10px">
                                                                <Box bg="black" w="40%" h="7px" borderRadius="10px"> </Box>
                                                            </Flex>

                                                            <Text opacity="80%"> 30 </Text>
                                                        </Flex>

                                                        <Flex alignItems="center" gap="5px" h="20px" w="90%">
                                                            <Text opacity="80%"> 1 </Text>
                                                            <GrStar style={{ fontSize: "20px", opacity: "80%" }} />
                                                            <Flex w="100%" bg="#f7f7f7" borderRadius="10px">
                                                                <Box bg="black" w="10%" h="7px" borderRadius="10px"> </Box>
                                                            </Flex>

                                                            <Text opacity="80%"> 14 </Text>
                                                        </Flex>

                                                    </Flex>

                                                </Flex>

                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </Flex>
                            </Flex>
                        </Flex>
                    </>
                ) : (
                    <ViewfinderSkeleton />
                )}

            </Flex>

            <CardCarousel
                data={static_data[2]}
                headingColor="black"
            />

            <CardCarousel
                data={static_data[3]}
                headingColor="black"
            />
        </>
    )
}

export { ViewFinder }
