import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Card } from "../Card/Card";
import { Spinner } from '@chakra-ui/react';
import { get_wishlist_status } from '../../redux/products/actions';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import "./CardCarousel.css";

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


    let wishlist = useSelector((store) => {
        return store.ProductReducer.wishlist
    })



    const load = async () => {
        try {
            if (token && data) {
                let status_response = await get_wishlist_status({ data }, token);
                set_status(status_response);
            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        load();
    }, [wishlist]);



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
                                    <Card product={elm} status={status[id]} key={id} />
                                </Flex>
                            )

                        })}
                    </Carousel>
                </>
                :

                <>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='pink.500'
                        size='xl'
                    />
                </>
            }

        </Flex>
    )
}



export { CardCarousel };
