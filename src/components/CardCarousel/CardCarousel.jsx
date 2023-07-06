import "./CardCarousel.css";
import { useEffect, useState } from 'react';
import { Box, Flex, Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { Card } from "../Card/Card";
import { Spinner } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';

const CardCarousel = ({ headingColor, bgImage, data: { title, data } }) => {

    let [status, set_status] = useState([]);
    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const breakpoints = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1500 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1500, min: 630 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 630, min: 0 },
            items: 2
        }
    }

    const load = async () => {

        if (!data?.length || !token) {
            return;
        }

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wishlist`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });

            let wishlist = await response.json();

            let status_list = data.map((elm) => {
                let track = wishlist.data.find((item) => {
                    return elm._id === item._id;
                })

                if (track) {
                    return true;
                } else {
                    return false;
                }
            })

            set_status(status_list);

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        load();
    }, []);

    return (
        <Flex className='card_wrapper' h={["450px", "600px", "600px", "600px"]} pb="50px" bgImage={bgImage} direction="column" justifyContent="center" alignItems="center">
            {data ?
                <>
                    <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" mb="20px" whiteSpace="nowrap">
                        <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                        <Heading as="h2" fontSize={["15px", "20px", "20px", "20px"]} color={headingColor}> {title} </Heading>
                        <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                    </Flex>
                    <Carousel
                        responsive={breakpoints}
                        containerClass="carousel_container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        infinite={true}
                    >
                        {data.map((elm, id) => {
                            return (
                                <Flex p="5%" key={id}>
                                    <Card product={elm} reload={load} status={status[id]} key={id} />
                                </Flex>
                            )

                        })}
                    </Carousel>
                </>
                :

                <>
                    <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" mb="20px" whiteSpace="nowrap">
                        <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                        <Heading as="h2" fontSize={["15px", "20px", "20px", "20px"]} color={headingColor}> {title} </Heading>
                        <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                    </Flex>
                    <Carousel
                        arrows={false}
                        responsive={breakpoints}
                        containerClass="carousel_container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        infinite={true}
                    >
                        <Flex p="5%">
                            <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} w={400} fadeDuration={1} />
                        </Flex>

                        <Flex p="5%">
                            <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} w={400} fadeDuration={1} />
                        </Flex>

                        <Flex p="5%">
                            <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} w={400} fadeDuration={1} />
                        </Flex>

                        <Flex p="5%">
                            <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} w={400} fadeDuration={1} />
                        </Flex>
                    </Carousel>
                </>
            }

        </Flex>
    )
}



export { CardCarousel };
